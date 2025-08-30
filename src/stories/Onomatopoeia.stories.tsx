import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookOnomatopoeia } from "./Onomatopoeia";

const meta = {
  title: "Example/Onomatopoeia",
  component: StorybookOnomatopoeia,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StorybookOnomatopoeia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
