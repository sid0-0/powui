import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookTooltip } from "./Tooltip";

const meta = {
  title: "Example/Tooltip",
  component: StorybookTooltip,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  args: {},
} satisfies Meta<typeof StorybookTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Play dumb!",
  },
};
