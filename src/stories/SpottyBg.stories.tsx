import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StorybookSpottyBg,
  StorybookSpottyBgMatrix,
  StorybookSpottyBgOpacity,
  StorybookSpottyBgVariants,
} from "./SpottyBg";

const meta = {
  title: "Example/SpottyBg",
  component: StorybookSpottyBg,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "Background color (any CSS color value)",
    },
    dotSize: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Dot radius preset",
    },
    spacing: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Tile grid size preset",
    },
    opacity: {
      control: { type: "select" },
      options: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      description: "Dot overlay opacity (percent)",
    },
    variant: {
      control: { type: "select" },
      options: ["standard", "diagonal"],
      description: "Pattern variant",
    },
  },
} satisfies Meta<typeof StorybookSpottyBg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    color: "#eab308",
    dotSize: "sm",
    spacing: "sm",
    opacity: 30,
    variant: "standard",
  },
};

export const Matrix: Story = {
  render: (args) => <StorybookSpottyBgMatrix color={args.color} variant={args.variant} />,
  args: {
    color: "#eab308",
    variant: "standard",
  },
  parameters: {
    controls: {
      include: ["color", "variant"],
    },
  },
};

export const OpacityScale: Story = {
  render: (args) => (
    <StorybookSpottyBgOpacity color={args.color} dotSize={args.dotSize} spacing={args.spacing} />
  ),
  args: {
    color: "#eab308",
    dotSize: "md",
    spacing: "md",
  },
  parameters: {
    controls: {
      include: ["color", "dotSize", "spacing"],
    },
  },
};

export const Variants: Story = {
  render: (args) => (
    <StorybookSpottyBgVariants
      color={args.color}
      dotSize={args.dotSize}
      spacing={args.spacing}
      opacity={args.opacity}
    />
  ),
  args: {
    color: "#eab308",
    dotSize: "md",
    spacing: "lg",
    opacity: 90,
  },
  parameters: {
    controls: {
      include: ["color", "dotSize", "spacing", "opacity"],
    },
  },
};
