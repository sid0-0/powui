import type { StoryObj } from "@storybook/react-vite";
import { StorybookBurst } from "./Burst";

const meta = {
  title: "Example/Burst",
  component: StorybookBurst,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: { type: "range", min: 50, max: 500, step: 1 },
      description: "Height of the impact area",
      defaultValue: 240,
    },
    width: {
      control: { type: "range", min: 50, max: 500, step: 1 },
      description: "Width of the impact area",
      defaultValue: 240,
    },
    heightVariance: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: "Variance in height of the impact peaks",
      defaultValue: 15,
    },
    peakSeparation: {
      control: { type: "range", min: 10, max: 200, step: 5 },
      description: "Distance between peaks in the impact area",
      defaultValue: 30,
    },
    flatteryFactor: {
      control: { type: "range", min: 0, max: 50, step: 1 },
      description:
        "Flattery factor for the curvature of the impact path, higher values create more pronounced curves",
      defaultValue: 2,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Rectangular: Story = {
  args: {
    huggingStyle: "rectangular",
  },
};

export const Elliptical: Story = {
  args: {
    huggingStyle: "elliptical",
  },
};
