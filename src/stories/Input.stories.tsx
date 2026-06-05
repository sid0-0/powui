import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookInput } from "./Input";

const meta = {
  title: "Example/Input",
  component: StorybookInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
  },
  args: {},
} satisfies Meta<typeof StorybookInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Your secret identity...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Clark Kent",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "you@dailyplanet.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Top secret...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Locked away in the Fortress",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: "not-an-email",
    invalid: true,
  },
};
