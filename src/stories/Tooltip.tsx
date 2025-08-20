import { Tooltip } from "@/components/ui/tooltip";

export const StorybookTooltip = ({
  type = "normal",
  bubblePath = "normal",
  content = "Tooltip content",
}: {
  type?: "normal" | "bubbles";
  bubblePath?: "normal" | "arc";
  content?: React.ReactNode;
}) => {
  return (
    <Tooltip
      triggerContent={
        <img width={400} src="secret_share.png" className="rounded-full" />
      }
      content={<div className="text-4xl">Clark Kent is SUPERMAN!!</div>}
      sideOffset={-120}
      type={type}
      bubblePath={bubblePath}
    />
  );
};
