import type { StoryObj } from "@storybook/react-vite";
import { StorybookBurst } from "./Burst";

const meta = {
  title: "Example/Burst",
  component: StorybookBurst,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: { type: "range", min: 200, max: 500, step: 1 },
      description: "Height of the impact area",
      defaultValue: 300,
    },
    width: {
      control: { type: "range", min: 200, max: 500, step: 1 },
      description: "Width of the impact area",
      defaultValue: 300,
    },
    heightVariance: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: "Variance in height of the impact peaks",
      defaultValue: 10,
    },
    peakSeparation: {
      control: { type: "range", min: 10, max: 200, step: 5 },
      description: "Distance between peaks in the impact area",
      defaultValue: 10,
    },
    flatteryFactor: {
      control: { type: "range", min: 0, max: 5, step: 0.05 },
      description:
        "Flattery factor for the curvature of the impact path, higher values create more pronounced curves",
      defaultValue: 2,
    },
    huggingStyle: {
      description: "Style of the burst, either 'elliptical' or 'rectangular'",
      options: ["elliptical", "rectangular"],
    },
    curvedDips: {
      description: "Whether the dips between peaks are curved or straight",
      defaultValue: false,
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
    curvedDips: true,
  },
  parameters: {
    controls: {
      exclude: ["huggingStyle", "curvedDips"],
    },
  },
};

export const EllipticalAngled: Story = {
  args: {
    huggingStyle: "elliptical",
  },
  parameters: {
    controls: {
      exclude: ["huggingStyle", "curvedDips"],
    },
  },
};

export const Bordered: Story = {
  args: {
    huggingStyle: "elliptical",
    borders: [
      { color: "green" },
      { color: "skyblue" },
      { color: "pink" },
      { color: "purple" },
    ],
  },
  argTypes: {
    huggingStyle: {
      control: { type: "select" },
      options: ["elliptical", "rectangular"],
    },
  },
};
