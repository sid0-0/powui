import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookFieldGroup } from "./FieldGroup";

const meta = {
  title: "Example/FieldGroup",
  component: StorybookFieldGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof StorybookFieldGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSeparator: Story = {
  args: {
    withSeparator: true,
  },
};

export const WithError: Story = {
  args: {
    withError: true,
  },
};

export const InsideFieldset: Story = {
  args: {
    withFieldset: true,
  },
};

export const Everything: Story = {
  args: {
    withFieldset: true,
    withSeparator: true,
    withError: true,
  },
};
