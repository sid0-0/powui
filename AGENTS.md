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

```bash
pnpm exec vitest run                                          # run all tests once
pnpm exec vitest                                              # run all tests in watch mode
pnpm exec vitest run src/stories/Button.stories.tsx           # run a single story file
pnpm exec vitest --project storybook run                      # explicitly target the storybook project
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
.storybook/          # Storybook config, global decorators, vitest setup
.github/workflows/   # chromatic.yml — CI visual regression
```

Path alias: **`@/`** maps to `./src/` — always use it for internal imports.

---

## TypeScript

- Target: `ES2022`, module resolution: `bundler`, JSX: `react-jsx`
- `strict: true` — full strict mode enabled
- `noUnusedLocals` and `noUnusedParameters` are **errors** — remove unused code
- `verbatimModuleSyntax: true` — type-only imports **must** use `import type`:
  ```ts
  import type { Meta, StoryObj } from "@storybook/react-vite";
  import { useMemo, type PropsWithChildren } from "react";
  ```
- `erasableSyntaxOnly: true` — no `enum`, no namespace declarations

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

### Component Declarations

Prefer `function` declarations for components exported from `components/ui/`. Arrow functions are used for Storybook story wrappers.

```ts
// UI component — function declaration
export function Button({ className, ...props }: TButtonProps) { ... }

// Storybook wrapper — arrow function OK
const StorybookButton = (props: TStorybookButtonProps) => { ... };
```

### Props & Types

- Extend native element props via `React.ComponentProps<"button">` or `React.ComponentProps<typeof Primitive>`
- Use inline intersection types for component props rather than separate named interfaces:
  ```ts
  type TBurstWrapperProps = React.PropsWithChildren<{
    size?: number;
    color?: string;
  }>;
  ```
- Use `satisfies` for Storybook meta to retain type inference:
  ```ts
  const meta = { component: StorybookButton } satisfies Meta<typeof StorybookButton>;
  ```

### Styling

- **Tailwind CSS v4** — configuration lives in `src/index.css` (`@theme inline`), **not** `tailwind.config.js`
- Always use `cn()` (from `@/lib/utils`) to merge class names: `cn("base-class", className)`
- CSS Modules (`.module.scss`) for keyframe animations or complex pseudo-element styles only
- Add `data-slot="component-name"` to every Radix primitive wrapper element (shadcn/ui pattern)
- Custom `@utility` classes are defined in `index.css`: `spotty-bg-*`, `clip-path-ellipse`, `no-scrollbar`

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

---

## Testing (Stories as Tests)

- Every component in `components/ui/` must have a corresponding story file at `src/stories/ComponentName.stories.tsx`
- The story wrapper (`src/stories/ComponentName.tsx`) is a thin adapter between Storybook arg shapes and the actual component API; it should not contain assertions
- Story file structure:
  ```ts
  import type { Meta, StoryObj } from "@storybook/react-vite";
  import { StorybookButton } from "./Button";

  const meta = {
    component: StorybookButton,
    tags: ["autodocs"],
  } satisfies Meta<typeof StorybookButton>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default: Story = { args: { label: "Click me" } };
  ```
- Use `argTypes` with `control: { type: "range" | "select" }` to configure Storybook controls
- Accessibility is configured globally (`a11y: { test: "todo" }`) — violations appear in UI but do not fail CI

---

## CI

- Every push triggers `.github/workflows/chromatic.yml`
- Chromatic publishes Storybook for visual regression review — `pnpm chromatic` uses `--exit-zero-on-changes`
- Node 24.x, pnpm 10.12.1 pinned in CI
