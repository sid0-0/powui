import type { StoryObj } from "@storybook/react-vite";
import { StorybookSlider } from "./Slider";

const meta = {
  title: "Example/Slider",
  component: StorybookSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    controls: {
      exclude: ["max", "min"],
    },
    step: {
      control: { type: "range", min: 1, max: 10 },
      description: "Step value of the slider",
      defaultValue: 1,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
  },
  parameters: {
    controls: {
      exclude: ["defaultValue", "shape"],
    },
  },
};

export const Rectangular: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
    shape: "rectangular",
  },
  parameters: {
    controls: {
      exclude: ["defaultValue", "shape"],
    },
  },
};
