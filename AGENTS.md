# AGENTS.md — Pow UI

A comic-book-inspired React component library built with React 19, TypeScript, Tailwind CSS v4, Radix UI primitives, and shadcn/ui conventions. Components are developed and documented in Storybook v9. Visual regression testing runs on Chromatic in CI.

---

## Package Manager

Use **pnpm** exclusively.

```bash
pnpm install         # install dependencies
```

---

## Commands

### Development

```bash
pnpm dev             # start Vite dev server
pnpm storybook       # run Storybook on http://localhost:5174
pnpm preview         # preview the production build
```

### Build & Lint

```bash
pnpm build           # tsc -b && vite build (type-check + bundle)
pnpm lint            # eslint . (flat config, ESLint 9)
```

### Testing

Tests are Storybook stories executed by Vitest via `@storybook/addon-vitest` in a real headless Chromium browser (Playwright). There are **no separate `*.test.ts` files** — stories are the tests.

The Vitest configuration lives **inside `vite.config.ts`** (no separate `vitest.config.ts`). The `/// <reference types="vitest/config" />` triple-slash directive at the top of `vite.config.ts` enables Vitest type support. `vitest.shims.d.ts` at the project root provides the Playwright provider type shim (`/// <reference types="@vitest/browser/providers/playwright" />`).

```bash
pnpm exec vitest run                                          # run all tests once
pnpm exec vitest                                              # run all tests in watch mode
pnpm exec vitest run src/stories/Button.stories.tsx           # run a single story file
pnpm exec vitest --project storybook run                      # explicitly target the storybook project
pnpm exec vitest run --coverage                               # run tests with coverage (v8 provider)
```

### Storybook Build / Chromatic

```bash
pnpm build-storybook  # build static Storybook
pnpm chromatic        # publish to Chromatic for visual regression (runs in CI on every push)
```

---

## Project Structure

```
src/
  components/ui/     # Production UI components (button.tsx, tooltip.tsx, …)
  lib/               # Shared utilities (cn(), geometry math)
  stories/           # Storybook wrappers (PascalCase.tsx) + story files (*.stories.tsx)
  styles/            # CSS Modules for complex animations (tooltip.module.scss)
  utils/             # General-purpose helpers (general.ts)
  index.css          # Global CSS: Tailwind v4 config (@theme inline), custom @utility, CSS vars
  App.tsx            # Vite scaffold entry — not part of the component library
  main.tsx           # Vite scaffold entry — not part of the component library
.storybook/          # Storybook config, global decorators, vitest setup
.github/workflows/   # chromatic.yml — CI visual regression
components.json      # shadcn/ui CLI config (style: "new-york", iconLibrary: "lucide")
references/          # Design reference images and links (not shipped; for contributors)
vite.config.ts       # Vite config; also contains embedded Vitest project config
vitest.shims.d.ts    # Playwright provider type shim for Vitest browser mode
```

Path alias: **`@/`** maps to `./src/` — always use it for internal imports.

---

## Key Dependencies

### Runtime

| Package | Purpose |
|---|---|
| `react` / `react-dom` | React 19 |
| `@radix-ui/react-avatar` | Avatar primitive |
| `@radix-ui/react-checkbox` | Checkbox primitive |
| `@radix-ui/react-slot` | `Slot` / `asChild` pattern |
| `@radix-ui/react-tooltip` | Tooltip primitive |
| `@mojs/core` | Burst animation engine — used by `SpiderSenseWrapper` |
| `class-variance-authority` | CVA — variant management for `Button` |
| `classnames` | `cx()` helper — used directly in `button.tsx` alongside `cn()` |
| `clsx` | Used inside `cn()` in `@/lib/utils` |
| `tailwind-merge` | Used inside `cn()` in `@/lib/utils` |
| `tailwindcss` / `@tailwindcss/vite` | Tailwind CSS v4 (Vite plugin integration) |
| `lucide-react` | Icon library (e.g., `CheckIcon` in Checkbox) |

### Dev / Build

| Package | Purpose |
|---|---|
| `@vitejs/plugin-react-swc` | Vite React plugin — uses **SWC** (not Babel) for transforms |
| `tw-animate-css` | Tailwind-compatible `animate-in`/`animate-out` utility classes; imported in `index.css` |
| `storybook` / `@storybook/react-vite` | Storybook v9 with Vite framework |
| `@storybook/addon-vitest` | Wires Storybook stories into Vitest as browser tests |
| `@storybook/addon-a11y` | Accessibility checks in Storybook |
| `@storybook/addon-docs` | Auto-generated component documentation |
| `@storybook/addon-onboarding` | Storybook onboarding addon |
| `@chromatic-com/storybook` | Chromatic visual regression integration |
| `chromatic` | CLI for publishing Storybook to Chromatic |
| `@vitest/browser` | Browser-mode testing for Vitest |
| `@vitest/coverage-v8` | V8-based coverage reporting |
| `playwright` | Headless browser provider for Vitest |
| `typescript-eslint` | TypeScript-aware ESLint rules |
| `eslint-plugin-react-hooks` | React hooks lint rules |
| `eslint-plugin-storybook` | Storybook-specific lint rules (flat/recommended config applied globally) |

---

## shadcn/ui Configuration (`components.json`)

The project uses the shadcn/ui `new-york` style preset. When adding new shadcn/ui components via the CLI, this file controls the output:

- **Style:** `new-york`
- **CSS variables:** enabled
- **Base color:** `neutral`
- **Tailwind CSS file:** `src/index.css`
- **Icon library:** `lucide`
- **Aliases:** `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`

---

## SVG Filter Architecture (Critical)

Several components depend on SVG filter effects defined globally: `filter-[url(#displacementFilter)]`, `filter-[url(#chromaAberFilter)]`, `filter-[url(#posterize)]`. These IDs must exist in the DOM at render time or the classes silently have no effect.

**`src/components/ui/svgFilterDefs.tsx`** exports a `SVGFilterDefs` component that renders these three SVG filter definitions into a hidden `<svg>` element.

**`.storybook/preview.tsx`** registers a global Storybook decorator that prepends `<SVGFilterDefs />` before every story:

```tsx
// .storybook/preview.tsx (simplified)
import { SVGFilterDefs } from "../src/components/ui/svgFilterDefs";

const preview = {
  decorators: [
    (Story) => (
      <>
        <SVGFilterDefs />
        <Story />
      </>
    ),
  ],
  // ...
};
```

**When building a new page or app that consumes this library, you must render `<SVGFilterDefs />` once near the root of your component tree**, otherwise all displacement/chroma/posterize effects will be invisible.

---

## TypeScript

- Target: `ES2022`, module resolution: `bundler`, JSX: `react-jsx`
- `strict: true` — full strict mode enabled
- `noUnusedLocals` and `noUnusedParameters` are **errors** — remove unused code
- `noFallthroughCasesInSwitch: true` — switch case fall-through is an error
- `noUncheckedSideEffectImports: true` — side-effect-only imports are checked
- `moduleDetection: force` — every file is treated as a module
- `allowImportingTsExtensions: true` — `.ts`/`.tsx` extensions allowed in imports
- `verbatimModuleSyntax: true` — type-only imports **must** use `import type`:
  ```ts
  import type { Meta, StoryObj } from "@storybook/react-vite";
  import { useMemo, type PropsWithChildren } from "react";
  ```
- `erasableSyntaxOnly: true` — no `enum`, no namespace declarations

There are three tsconfig files: `tsconfig.json` (root composite references), `tsconfig.app.json` (for `src/`), and `tsconfig.node.json` (for `vite.config.ts`). The root `tsconfig.json` also contains a `compilerOptions` block with path aliases and `module: es2020` — this block is inert for compilation purposes (child configs govern actual compilation) but aids some editor tooling.

---

## Code Style

### Imports

Order imports as: React → external libraries → internal `@/` paths → CSS/assets.

```ts
import * as React from "react";                         // React namespace import
import * as TooltipPrimitive from "@radix-ui/react-tooltip";  // Radix namespace import
import { cn } from "@/lib/utils";                       // internal via @/ alias
import styles from "@/styles/tooltip.module.scss";      // CSS Module
```

- Use `import * as X` for React and Radix UI primitives
- No barrel `index.ts` files — import directly from the source file
- Do not import from `dist/` or relative paths when `@/` applies

### Naming Conventions

| Kind | Convention | Example |
|---|---|---|
| UI component files | `camelCase.tsx` | `button.tsx`, `spiderSenseWrapper.tsx` |
| Story wrapper files | `PascalCase.tsx` | `Button.tsx`, `Tooltip.tsx` |
| Story files | `PascalCase.stories.tsx` | `Button.stories.tsx` |
| Exported components | `PascalCase` | `Button`, `BurstWrapper` |
| Local prop type aliases | `T` prefix | `TBurstWrapperProps`, `TCloudWrapperProps` |
| Hooks | `use` prefix, camelCase | `useEventOnomatopoeia`, `useCreateFilterId` |
| Module-level constants | `SCREAMING_SNAKE_CASE` | `HEIGHT_VARIANCE`, `COLORS_LIST` |
| Storybook wrappers | `Storybook` prefix | `StorybookButton`, `StorybookTabs` |
| CSS custom properties | `--kebab-case` | `--background`, `--primary` |

**Known exception:** `src/stories/spiderSense.tsx` and `src/stories/spiderSense.stories.tsx` use a lowercase `s` — this predates the PascalCase convention. New story files must use PascalCase.

### Component Declarations

Prefer `function` declarations for components exported from `components/ui/`. Arrow functions are used for Storybook story wrappers.

```ts
// UI component — function declaration
export function Button({ className, ...props }: TButtonProps) { ... }

// Storybook wrapper — arrow function OK
const StorybookButton = (props: TStorybookButtonProps) => { ... };
```

**Hook-as-primary-API:** `src/components/ui/onomatopoeia.tsx` exports only a hook (`useEventOnomatopoeia`) rather than a component. This is the sole case in `components/ui/` where the primary export is not a React component.

### Props & Types

- Extend native element props via `React.ComponentProps<"button">` or `React.ComponentProps<typeof Primitive>`
- Use inline intersection types for component props rather than separate named interfaces:
  ```ts
  type TBurstWrapperProps = React.PropsWithChildren<{
    size?: number;
    color?: string;
  }>;
  ```
- Use `satisfies` for Storybook meta to retain type inference (preferred; some older stories use plain object meta):
  ```ts
  const meta = { component: StorybookButton } satisfies Meta<typeof StorybookButton>;
  ```

### Styling

- **Tailwind CSS v4** — configuration lives in `src/index.css` (`@theme inline`), **not** `tailwind.config.js`
- Always use `cn()` (from `@/lib/utils`) to merge class names: `cn("base-class", className)`
- `classnames` (`cx`) is also available and is used directly in `button.tsx` for conditional class composition; do not mix `cx` and `cn` in the same expression
- CSS Modules (`.module.scss`) for keyframe animations or complex pseudo-element styles only
- Add `data-slot="component-name"` to every Radix primitive wrapper element (shadcn/ui pattern)
- Custom `@utility` classes are defined in `index.css`: `spotty-bg-*`, `spotty-bg-diagonal-*`, `clip-path-ellipse`
- `tw-animate-css` is imported globally and provides `animate-in`/`animate-out` and related utility classes

### Fonts

Two Google Fonts are loaded globally in `src/index.css`:

- **Walter Turncoat** — handwritten comic style; used in `Button` (`font-[Walter_Turncoat]`)
- **Bangers** — bold comic display font; available for headings/display elements

Reference these via Tailwind's arbitrary font utility: `font-[Walter_Turncoat]`, `font-[Bangers]`.

### Dark Mode

Dark mode is implemented via a CSS class strategy. `src/index.css` defines:

```css
@custom-variant dark (&:is(.dark *));
```

Adding the `dark` class to any ancestor element activates dark-mode CSS variable overrides. The `.dark { ... }` block in `index.css` overrides the full shadcn/ui token set using `oklch()` colors. Use the `dark:` Tailwind variant in components where needed.

### CSS Variables & Color Tokens

All design tokens are defined as CSS custom properties in `:root` (and overridden in `.dark`) using `oklch()` color values. The `@theme inline` block maps them to Tailwind color utilities:

```css
/* Usage in Tailwind */
bg-background    /* var(--background) */
text-foreground  /* var(--foreground) */
border-border    /* var(--border) */
/* etc. */
```

Full token set: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `chart-1` through `chart-5`, `sidebar-*`. Radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`.

### Error Handling

- Use **guard clauses with early return** rather than nested conditionals:
  ```ts
  if (!containerRef.current) return;
  if (width === 0 || height === 0) return { points: [], path: "" };
  ```
- Use optional chaining for potentially absent refs or callbacks: `getManualTrigger?.(shootLines)`
- Non-null assertion (`!`) is acceptable only when DOM presence is guaranteed at call site
- No `try/catch` for synchronous operations — prefer defensive guards

### Hooks & DOM

- Use `useState<El | null>(null)` + a callback ref (`ref={setContainerRef}`) to capture DOM nodes; recalculate derived values in `useMemo` with the element as a dependency
- `useMemo` is preferred over `useEffect` + `useState` for pure derivations from props/state
- `window.crypto.randomUUID()` for generating unique SVG IDs (clip paths, filters)
- Portals via `createPortal(element, document.body)` for overlays (onomatopoeia effects)

### Imperative Animation Pattern

Components that require press-state feedback (e.g., `Button`) attach imperative DOM listeners rather than using CSS `:active` pseudo-classes, because the displacement SVG filter interferes with CSS transform transitions:

```ts
// button.tsx — simplified
element.addEventListener("mousedown", () => {
  element.style.translate = "...";
  element.style.boxShadow = "...";
});
element.addEventListener("mouseup", reset);
element.addEventListener("mouseleave", reset);
```

Prefer this pattern only when CSS transitions cannot achieve the desired result due to SVG filter constraints.

---

## Testing (Stories as Tests)

- Every component in `components/ui/` must have a corresponding story file at `src/stories/ComponentName.stories.tsx`
- The story wrapper (`src/stories/ComponentName.tsx`) is a thin adapter between Storybook arg shapes and the actual component API; it should not contain assertions
- Story file structure:
  ```ts
  import type { Meta, StoryObj } from "@storybook/react-vite";
  import { StorybookButton } from "./Button";

  const meta = {
    title: "Example/Button",
    component: StorybookButton,
    tags: ["autodocs"],
  } satisfies Meta<typeof StorybookButton>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = { args: { label: "Click me" } };
  ```
- All stories use `title: "Example/ComponentName"` as the Storybook title prefix
- Use `argTypes` with `control: { type: "range" | "select" }` to configure Storybook controls
- Use `fn()` from `storybook/test` to spy on event handler args (e.g., `onClick: fn()`)
- Accessibility is configured globally (`a11y: { test: "todo" }`) — violations appear in UI but do not fail CI

### Storybook Global Setup

`.storybook/vitest.setup.ts` imports both `@storybook/addon-a11y/preview` and `./preview`, then calls `setProjectAnnotations(...)`. This wires up the global decorator (which renders `SVGFilterDefs`) and a11y annotations for every story run under Vitest.

---

## CI

- Every push triggers `.github/workflows/chromatic.yml`
- Chromatic publishes Storybook for visual regression review — `pnpm chromatic` uses `--exit-zero-on-changes`
- Node `24.7.0`, pnpm `10.12.1` pinned in CI
- **Tests do not run in CI** — only visual regression (Chromatic) runs on push. Run `pnpm exec vitest run` locally before pushing

### Required Secrets

| Secret | Purpose |
|---|---|
| `CHROMATIC_PROJECT_TOKEN` | Authenticates the Chromatic publish step in CI; must be set in GitHub repository secrets |
