import type { Meta, StoryObj } from "@storybook/react-vite";
import { StorybookSupermanText } from "./SupermanText";

const meta = {
  title: "Example/SupermanText",
  component: StorybookSupermanText,
  parameters: { layout: "centered" },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof StorybookSupermanText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
