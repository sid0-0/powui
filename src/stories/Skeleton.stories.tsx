import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookSkeleton } from "./Skeleton";

const meta = {
  title: "Example/Skeleton",
  component: StorybookSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof StorybookSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    burst: false,
  },
};
