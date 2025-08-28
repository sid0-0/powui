import type { Preview } from "@storybook/react-vite";
import { SVGFilterDefs } from "../src/components/ui/svgFilterDefs";
import "../src/index.css";

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
  decorators: [
    (Story) => {
      return (
        <>
          <SVGFilterDefs />
          <Story />
        </>
      );
    },
  ],
};

export default preview;
