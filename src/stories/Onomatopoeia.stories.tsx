import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorybookOnomatopoeia } from "./Onomatopoeia";
import { BurstWrapper } from "@/components/ui/burst";

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
        <div
          className="absolute top-0 size-full flex items-center justify-center text-4xl italic font-extrabold text-red-700"
          style={{
            textShadow: "1px 1px red, 3px 3px red, 5px 5px red",
          }}
        >
          POW!
        </div>
      </div>
    ),
  },
};
