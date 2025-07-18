import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookSpiderSense } from "./spiderSense";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SpiderSense",
  component: StorybookSpiderSense,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof StorybookSpiderSense>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {},
};

export const ManualTrigger: Story = {
  args: {
    trigger: "manual",
  },
};
