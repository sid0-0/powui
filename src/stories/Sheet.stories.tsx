import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookSheet } from "./Sheet";

const meta = {
  title: "Example/Sheet",
  component: StorybookSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof StorybookSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSides: Story = {};
