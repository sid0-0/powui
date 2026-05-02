import type { StoryObj } from "@storybook/react-vite";
import { StorybookSonner } from "./Sonner";

const meta = {
  title: "Example/Sonner",
  component: StorybookSonner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
