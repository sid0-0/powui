import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookField } from "./Field";

const meta = {
  title: "Example/Field",
  component: StorybookField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
  args: {},
} satisfies Meta<typeof StorybookField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Hero name",
    description: "What does the world call you?",
    placeholder: "e.g. Spider-Man",
  },
};

export const WithoutDescription: Story = {
  args: {
    label: "Sidekick",
    description: "",
    placeholder: "Robin? Bucky?",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    description: "We'll send your superhero certification here.",
    defaultValue: "not-an-email",
    error: "That doesn't look like a real email address!",
  },
};

export const Horizontal: Story = {
  args: {
    label: "Catchphrase",
    description: "Keep it under 5 words.",
    placeholder: "Whatever a spider can!",
    orientation: "horizontal",
  },
};

export const Responsive: Story = {
  args: {
    label: "Secret HQ",
    description: "Resize the canvas to see the layout switch.",
    placeholder: "Fortress of Solitude",
    orientation: "responsive",
  },
};
