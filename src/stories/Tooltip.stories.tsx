import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookTooltip } from "./Tooltip";

const meta = {
  title: "Example/Tooltip",
  component: StorybookTooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof StorybookTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    type: "normal",
  },
};

export const Bubbles: Story = {
  args: {
    type: "bubbles",
    bubblePath: "arc",
  },
};
