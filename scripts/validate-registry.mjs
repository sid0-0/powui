#!/usr/bin/env node
// Validates registry.json against the actual source files it ships.
//
// Checks performed:
//   1. JSON parses cleanly
//   2. Every `files[].path` exists on disk
//   3. Every `registryDependencies` entry resolves to an item in this registry
//   4. Every npm-style import in each source file is declared in `dependencies`
//      (or `devDependencies`)
//   5. Every internal `@/`-aliased import resolves to a registry item that's
//      listed in `registryDependencies`
//
// Exit code 0 on success, 1 on any error. Wired as `pnpm validate:registry`.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = join(ROOT, "registry.json");

// @/ aliases that map to registry item names. Anything starting with one of
// these prefixes (excluding @/components/ui/* which is handled separately)
// should be declared as a registryDependency.
const ALIAS_TO_REGISTRY_ITEM = [
  ["@/lib/utils", "utils"],
  ["@/lib/geometryUtils", "geometry-utils"],
  ["@/utils/general", "general-utils"],
  ["@/hooks/use-mobile", "use-mobile"],
];

// Map a UI component import (`@/components/ui/foo`) to its registry item name.
// Most match directly (lowercased), except for the camelCase file that ships
// as a kebab-case registry item.
const UI_FILENAME_TO_REGISTRY_ITEM = {
  spiderSenseWrapper: "spider-sense-wrapper",
};

// Imports we don't validate (peers, runtimes).
const IGNORED_IMPORTS = new Set(["react", "react-dom"]);

const errors = [];
const warnings = [];

function err(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

// ─── Parse ────────────────────────────────────────────────────────────────
let registry;
try {
  registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
} catch (e) {
  console.error(`✗ registry.json failed to parse: ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(registry.items)) {
  console.error("✗ registry.json is missing an `items` array");
  process.exit(1);
}

const items = registry.items;
const itemNames = new Set(items.map((i) => i.name));

// ─── Walk each item ───────────────────────────────────────────────────────
for (const item of items) {
  const decl = new Set([
    ...(item.dependencies ?? []),
    ...(item.devDependencies ?? []),
  ]);
  const declRegistry = new Set(item.registryDependencies ?? []);

  // 1. registryDependencies all exist
  for (const dep of declRegistry) {
    if (!itemNames.has(dep)) {
      err(
        `[${item.name}] registryDependencies references unknown item "${dep}"`,
      );
    }
  }

  // 2. Walk each file
  for (const file of item.files ?? []) {
    const fullPath = join(ROOT, file.path);
    if (!existsSync(fullPath)) {
      err(`[${item.name}] file does not exist: ${file.path}`);
      continue;
    }

    // Only static-analyse .ts/.tsx for imports
    if (!/\.(ts|tsx)$/.test(file.path)) continue;

    const src = readFileSync(fullPath, "utf8");
    const imports = extractImports(src);

    for (const spec of imports) {
      if (IGNORED_IMPORTS.has(spec)) continue;

      // Internal alias → must be in registryDependencies
      if (spec.startsWith("@/components/ui/")) {
        const fileName = spec.slice("@/components/ui/".length);
        const target =
          UI_FILENAME_TO_REGISTRY_ITEM[fileName] ?? fileName.toLowerCase();
        if (!itemNames.has(target)) {
          err(
            `[${item.name}] imports "${spec}" but no registry item named "${target}" exists`,
          );
        } else if (!declRegistry.has(target)) {
          err(
            `[${item.name}] imports "${spec}" but "${target}" is missing from registryDependencies`,
          );
        }
        continue;
      }

      let matchedAlias = false;
      for (const [prefix, target] of ALIAS_TO_REGISTRY_ITEM) {
        if (spec === prefix || spec.startsWith(prefix + "/")) {
          matchedAlias = true;
          if (!declRegistry.has(target)) {
            err(
              `[${item.name}] imports "${spec}" but "${target}" is missing from registryDependencies`,
            );
          }
          break;
        }
      }
      if (matchedAlias) continue;

      // Other @/ alias → unknown internal import; warn
      if (spec.startsWith("@/")) {
        warn(
          `[${item.name}] imports unknown internal alias "${spec}" — not tracked by validator`,
        );
        continue;
      }

      // Relative import → must reference a sibling file shipped in the item
      if (spec.startsWith(".")) {
        const sourceDir = dirname(file.path);
        const resolved = normalize(join(sourceDir, spec));
        const matched = (item.files ?? []).some(
          (f) =>
            normalize(f.path) === resolved ||
            normalize(f.path) === resolved + ".ts" ||
            normalize(f.path) === resolved + ".tsx" ||
            normalize(f.path) === resolved + ".scss" ||
            normalize(f.path) === resolved + ".css",
        );
        if (!matched) {
          err(
            `[${item.name}] ${file.path} has relative import "${spec}" but no matching file is shipped in this item`,
          );
        }
        continue;
      }

      // Bare specifier → npm package; must be declared
      const pkg = packageNameFromSpec(spec);
      if (!decl.has(pkg)) {
        err(
          `[${item.name}] imports "${spec}" but "${pkg}" is missing from dependencies/devDependencies`,
        );
      }
    }
  }
}

// ─── Report ───────────────────────────────────────────────────────────────
if (warnings.length) {
  console.warn("Warnings:");
  for (const w of warnings) console.warn("  ! " + w);
}
if (errors.length) {
  console.error("Errors:");
  for (const e of errors) console.error("  ✗ " + e);
  console.error(`\n${errors.length} error(s) found in registry.json`);
  process.exit(1);
}
console.log(`✓ registry.json OK (${items.length} items)`);

// ─── Helpers ──────────────────────────────────────────────────────────────
function extractImports(src) {
  const out = [];
  // Match: import ... from "x"; import "x"; import("x")
  const re = /(?:import\s+(?:type\s+)?(?:[\w*{},\s]+from\s+)?|import\s*\()\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src))) out.push(m[1]);
  return out;
}

function packageNameFromSpec(spec) {
  if (spec.startsWith("@")) {
    const parts = spec.split("/");
    return parts.slice(0, 2).join("/");
  }
  return spec.split("/")[0];
}

function normalize(p) {
  // Collapse any "./" or "../" segments
  const segs = [];
  for (const s of p.split("/")) {
    if (s === "" || s === ".") continue;
    if (s === "..") segs.pop();
    else segs.push(s);
  }
  return segs.join("/");
}
