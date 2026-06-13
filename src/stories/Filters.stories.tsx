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

export const Electricity = {
  args: {
    scale: 15,
    frequency: 0.065,
    duration: 2.5,
  },
  argTypes: {
    scale: { control: { type: "range", min: 1, max: 60, step: 1 } },
    frequency: { control: { type: "range", min: 0.01, max: 0.5, step: 0.005 } },
    duration: { control: { type: "range", min: 0.5, max: 10, step: 0.5 } },
  },
  render: ({
    scale,
    frequency,
    duration,
  }: {
    scale: number;
    frequency: number;
    duration: number;
  }) => (
    <StorybookFilters
      filterType="Electricity"
      componentArgs={{ scale, frequency, duration }}
    />
  ),
};
