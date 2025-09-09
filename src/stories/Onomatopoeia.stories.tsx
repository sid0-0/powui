import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookOnomatopoeia } from "./Onomatopoeia";
import { BurstWrapper } from "@/components/ui/burst";
import { SupermanText } from "@/components/ui/supermanText";

const meta = {
  title: "Example/Onomatopoeia",
  component: StorybookOnomatopoeia,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StorybookOnomatopoeia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};

export const ClickBurst: Story = {
  args: {
    showClickBurst: true,
  },
};

export const PowClickBurst: Story = {
  args: {
    showClickBurst: true,
    displayElement: (
      <div className="relative">
        <BurstWrapper>
          <div style={{ height: 100, width: 100 }} />
        </BurstWrapper>
        <SupermanText
          className="absolute top-0 size-full flex items-center justify-center text-4xl italic font-extrabold text-red-700"
          dx={5}
          dy={5}
          color="red"
        >
          POW!
        </SupermanText>
      </div>
    ),
  },
};
