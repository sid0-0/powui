View Storybook of all components: [![Storybook](https://img.shields.io/badge/Storybook-Online-blue)](https://www.chromatic.com/library?appId=68b33f12384a75f2c732fa44)

# 🎨 Pow UI — Comic-Inspired React Component Library

**Pow UI** is a work-in-progress component library built with **React + TypeScript**, inspired by classic comic books.
It's all about playful UIs: speech bubbles, action panels, halftone textures, and bold borders.

---

## ✨ Features (WIP)

- 🗯️ Comic-inspired components: speech bubbles, panels, captions
- ⚡ Built with **React + TypeScript + Tailwind v4**
- 📦 **shadcn-compatible registry** — drop components into any project with one command
- 📚 Storybook docs for live preview and testing
- 🛠️ Lightweight, modular, and accessible

---

## 📦 Install a Component

Every component is published as a shadcn registry item at `https://powui.dev/r/<name>.json`. Add one to your project with your package manager of choice:

```bash
pnpm dlx shadcn@latest add https://powui.dev/r/button.json
npx shadcn@latest add https://powui.dev/r/button.json
yarn dlx shadcn@latest add https://powui.dev/r/button.json
bunx --bun shadcn@latest add https://powui.dev/r/button.json
```

The `theme` item ships the CSS variables, custom utilities (`spotty-bg-*`, `hatched-bg-*`), and keyframes the components rely on, and is pulled in automatically as a dependency. Browse all items at [powui.dev/components](https://powui.dev/components) — each demo includes a copy-able install snippet.

---

## 🚀 Getting Started (Local Development)

Clone and install with **pnpm**:

```bash
git clone https://github.com/yodel/powui.git
cd powui
pnpm install
```

Run the marketing site / components showcase:

```bash
pnpm dev               # Next.js dev server
```

Run Storybook for isolated component development:

```bash
pnpm storybook         # http://localhost:5174
```

---

## 📚 Components

| Component | Description |
|---|---|
| `Avatar` | Comic-style user avatars with heavy borders |
| `Burst` | Jagged onomatopoeia bursts ("BANG!", "POW!", "ZAP!") |
| `Button` | Tactile button with comic borders and press physics |
| `Checkbox` | Hand-drawn-looking checkbox |
| `Cloud` | Speech bubbles and thought clouds |
| `Field` | Form field wrapper with label/description/error |
| `Filters` | SVG filter wrappers — Displacement, ChromaAberr, Posterize |
| `Input` | Halftone-backed text field |
| `Onomatopoeia` | Portal-based click effects with comic words |
| `Sheet` | Slide-in drawer that enters from any edge |
| `Sidebar` | Comic-styled sidebar/navigation layout |
| `Skeleton` | Pulsing loading placeholders |
| `Slider` | Range input with circular or rectangular thumbs |
| `Sonner` | Comic-book toast notifications (5 variants) |
| `SpiderSense` | Burst animation lines drawing attention to an element |
| `Tabs` | Tabs with configurable placement (top/bottom/left/right) |
| `Tooltip` | Popup hints with speech-bubble styling |

---

## 🗺️ Roadmap

- [x] shadcn-compatible install registry
- [x] Customizable themes (colors, fonts, halftone patterns)
- [ ] Add `CalendarPicker` and more
- [ ] Build docs site

---

## 🤝 Contributing

Ideas and feedback are welcome! Open an issue or suggest new comic-inspired components.
