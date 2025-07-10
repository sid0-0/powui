import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookCheckbox } from "./Checkbox";

const meta = {
  title: "Example/Checkbox",
  component: StorybookCheckbox,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StorybookCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
