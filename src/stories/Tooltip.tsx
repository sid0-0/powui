import { Tooltip } from "@/components/ui/tooltip";

export const StorybookTooltip = () => {
  return (
    <Tooltip
      triggerContent={
        <img width={400} src="secret_share.png" className="rounded-full" />
      }
      content={<div className="text-4xl">Clark Kent is SUPERMAN!!</div>}
      sideOffset={-80}
    />
  );
};
