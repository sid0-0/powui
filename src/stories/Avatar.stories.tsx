import type { StoryObj } from "@storybook/react-vite";
import { StorybookAvatar } from "./Avatar";

const meta = {
  title: "Example/Avatar",
  component: StorybookAvatar,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://static.dc.com/dc/files/default_images/Char_Thumb_WonderWoman_20190116_5c3fc6aa51d064.76155401.jpg",
    fallback: "Wonder Woman",
  },
};

export const Fallback: Story = {
  args: {
    src: "no_image_available",
    fallback: "Hawley Griffin",
  },
};

export const Floating: Story = {
  args: {
    src: "public/green_lantern_transparent.png",
    fallback: "Green Lantern",
    floating: true,
  },
};
