import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookSpiderSense } from "./spiderSense";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SpiderSense",
  component: StorybookSpiderSense,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    shape: {
      control: {
        accept: ["zigzag", "line"],
      },
    },
  },
} satisfies Meta<typeof StorybookSpiderSense>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Random: Story = {
  args: {},
};

export const ZigZag: Story = {
  args: {
    shape: "zigzag",
  },
};

export const Line: Story = {
  args: {
    shape: "line",
  },
};
