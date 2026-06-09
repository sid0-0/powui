import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE_URL =
  process.env.REGISTRY_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://powui.dev");

console.log(`Building registry with base URL: ${BASE_URL}`);

const registry = JSON.parse(readFileSync("registry.json", "utf8"));
const itemNames = new Set(registry.items.map((i) => i.name));

const transformed = {
  ...registry,
  homepage: BASE_URL,
  items: registry.items.map((item) => ({
    ...item,
    registryDependencies: (item.registryDependencies ?? []).map((dep) =>
      itemNames.has(dep) ? `${BASE_URL}/r/${dep}.json` : dep,
    ),
  })),
};

writeFileSync("registry.build.json", JSON.stringify(transformed, null, 2));
try {
  execSync("npx shadcn@latest build registry.build.json", { stdio: "inherit" });
} finally {
  unlinkSync("registry.build.json");
}
