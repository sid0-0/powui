import type { Preview } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import "../src/index.css";

const THEMES = {
  brand: {
    primary: "oklch(0.798 0.169 81.6)",
    accent: "oklch(0.911 0.090 89.7)",
  },
  retro: {
    primary: "oklch(0.65 0.20 25)",
    accent: "oklch(0.85 0.12 25)",
  },
  cyber: {
    primary: "oklch(0.70 0.22 200)",
    accent: "oklch(0.85 0.15 200)",
  },
  noir: {
    primary: "oklch(0.20 0 0)",
    accent: "oklch(0.80 0 0)",
  },
} as const;

type ThemeKey = keyof typeof THEMES;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "Brand theme",
      defaultValue: "brand",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "brand", title: "Brand (Pow yellow)" },
          { value: "retro", title: "Retro red" },
          { value: "cyber", title: "Cyber cyan" },
          { value: "noir", title: "Noir" },
        ],
        dynamic: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const key = (ctx.globals.theme as ThemeKey) ?? "brand";
      const t = THEMES[key] ?? THEMES.brand;
      const style = {
        "--primary": t.primary,
        "--accent": t.accent,
      } as CSSProperties;
      return (
        <div style={style}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
