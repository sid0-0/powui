import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StorybookHatchedBg,
  StorybookHatchedBgAngles,
  StorybookHatchedBgMatrix,
  StorybookHatchedBgOpacity,
  StorybookHatchedBgVariants,
} from "./HatchedBg";

const meta = {
  title: "Example/HatchedBg",
  component: StorybookHatchedBg,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Background color (any CSS color value)",
    },
    thickness: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Line thickness preset",
    },
    spacing: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Gap between lines preset",
    },
    opacity: {
      control: { type: "select" },
      options: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      description: "Line opacity (percent)",
    },
    angle: {
      control: { type: "select" },
      options: [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165],
      description: "Line angle in degrees (only affects diagonal and cross variants)",
    },
    variant: {
      control: { type: "select" },
      options: ["diagonal", "cross"],
      description: "Pattern variant",
    },
  },
} satisfies Meta<typeof StorybookHatchedBg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    color: "#F3B807",
    thickness: "sm",
    spacing: "md",
    opacity: 30,
    angle: 45,
    variant: "diagonal",
  },
};

export const Matrix: Story = {
  render: (args) => <StorybookHatchedBgMatrix color={args.color} variant={args.variant} />,
  args: {
    color: "#F3B807",
    variant: "diagonal",
  },
  parameters: {
    controls: {
      include: ["color", "variant"],
    },
  },
};

export const OpacityScale: Story = {
  render: (args) => (
    <StorybookHatchedBgOpacity
      color={args.color}
      thickness={args.thickness}
      spacing={args.spacing}
      variant={args.variant}
    />
  ),
  args: {
    color: "#F3B807",
    thickness: "sm",
    spacing: "md",
    variant: "diagonal",
  },
  parameters: {
    controls: {
      include: ["color", "thickness", "spacing", "variant"],
    },
  },
};

export const AngleScale: Story = {
  render: (args) => (
    <StorybookHatchedBgAngles
      color={args.color}
      thickness={args.thickness}
      spacing={args.spacing}
      opacity={args.opacity}
    />
  ),
  args: {
    color: "#F3B807",
    thickness: "sm",
    spacing: "md",
    opacity: 80,
  },
  parameters: {
    controls: {
      include: ["color", "thickness", "spacing", "opacity"],
    },
  },
};

export const Variants: Story = {
  render: (args) => (
    <StorybookHatchedBgVariants
      color={args.color}
      thickness={args.thickness}
      spacing={args.spacing}
      opacity={args.opacity}
      angle={args.angle}
    />
  ),
  args: {
    color: "#F3B807",
    thickness: "sm",
    spacing: "md",
    opacity: 90,
    angle: 45,
  },
  parameters: {
    controls: {
      include: ["color", "thickness", "spacing", "opacity", "angle"],
    },
  },
};
