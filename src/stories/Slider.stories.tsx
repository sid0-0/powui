import type { StoryObj } from "@storybook/react-vite";
import { StorybookSlider } from "./Slider";
import React from "react";

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
    thickness: {
      control: { type: "range", min: 8, max: 32 },
      description: "Thickness of the slider track and thumb",
      defaultValue: 12,
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
    className: "w-64",
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
    className: "w-64",
  },
  parameters: {
    controls: {
      exclude: ["defaultValue", "shape"],
    },
  },
};

export const Vertical: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
    orientation: "vertical",
    thickness: 12,
    className: "w-64",
  },
  render: (args) => (
    <div className="flex items-center gap-16 [&.slider-track]:w-16">
      <StorybookSlider {...args} shape="rectangular" />
      <StorybookSlider {...args} />
    </div>
  ),
  parameters: {
    controls: {
      exclude: ["defaultValue"],
    },
  },
};

const VariableThicknessRenderer = (args: any) => {
  const [value, setValue] = React.useState([50]);
  const onChange = (newValue: number[]) => {
    setValue(newValue);
  };
  const modifiedArgs = {
    ...args,
    value,
    onValueChange: onChange,
  };
  return (
    <div className="flex flex-col items-center gap-8">
      <StorybookSlider {...modifiedArgs} />
      <div className="flex gap-16 justify-between w-full">
        <StorybookSlider {...modifiedArgs} orientation="vertical" />
        <StorybookSlider
          {...modifiedArgs}
          orientation="vertical"
          shape="rectangular"
        />
      </div>
      <StorybookSlider {...modifiedArgs} shape="rectangular" />
    </div>
  );
};

export const VariableThickness: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
    thickness: 20,
    className: "w-64",
  },
  render: VariableThicknessRenderer,
  parameters: {
    controls: {
      exclude: ["defaultValue"],
    },
  },
};
