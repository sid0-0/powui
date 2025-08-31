import type { StoryObj } from "@storybook/react-vite";
import { StorybookNarratorAlert } from "./NarratorAlert";

const meta = {
  title: "Example/NarratorAlert",
  component: StorybookNarratorAlert,
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
