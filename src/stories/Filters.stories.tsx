import type { Meta } from "@storybook/react-vite";

import { StorybookFilters } from "./Filters";

const meta = {
  title: "Example/Filters",
  component: StorybookFilters,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    filterType: {
      control: false,
    },
    componentArgs: { control: false },
  },
} satisfies Meta<typeof StorybookFilters>;

export default meta;

export const Displacement = {
  args: {
    scale: 10,
    frequency: 0.5,
  },
  argTypes: {
    scale: { control: { type: "range", min: 1, max: 50, step: 1 } },
    frequency: { control: { type: "range", min: 0.1, max: 1, step: 0.1 } },
  },
  render: ({ scale, frequency }: { scale: number; frequency: number }) => (
    <StorybookFilters
      filterType="Displacement"
      componentArgs={{ scale, frequency }}
    />
  ),
};

export const ChromaAberr = {
  args: {
    offset: 2,
  },
  argTypes: {
    offset: { control: { type: "range", min: 1, max: 10, step: 1 } },
  },
  render: ({ offset }: { offset: number }) => (
    <StorybookFilters filterType="ChromaAberr" componentArgs={{ offset }} />
  ),
};
export const Posterize = {
  args: {
    buckets: 4,
  },
  argTypes: {
    buckets: { control: { type: "range", min: 2, max: 20, step: 1 } },
  },
  render: ({ buckets }: { buckets: number }) => (
    <StorybookFilters filterType="Posterize" componentArgs={{ buckets }} />
  ),
};

export const Ripple = {
  args: {
    scale: 6,
    minFrequency: 0.01,
    maxFrequency: 0.03,
    duration: 6,
  },
  argTypes: {
    scale: { control: { type: "range", min: 1, max: 30, step: 1 } },
    minFrequency: { control: { type: "range", min: 0.005, max: 0.1, step: 0.005 } },
    maxFrequency: { control: { type: "range", min: 0.005, max: 0.1, step: 0.005 } },
    duration: { control: { type: "range", min: 1, max: 20, step: 1 } },
  },
  render: ({
    scale,
    minFrequency,
    maxFrequency,
    duration,
  }: {
    scale: number;
    minFrequency: number;
    maxFrequency: number;
    duration: number;
  }) => (
    <StorybookFilters
      filterType="Ripple"
      componentArgs={{ scale, minFrequency, maxFrequency, duration }}
    />
  ),
};
