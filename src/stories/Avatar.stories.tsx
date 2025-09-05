import type { StoryObj } from "@storybook/react-vite";
import { StorybookAvatar } from "./Avatar";

const meta = {
  title: "Example/Avatar",
  component: StorybookAvatar,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
