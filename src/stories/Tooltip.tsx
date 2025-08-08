import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import styles from "@/styles/tooltip.module.scss";

export const StorybookTooltip = () => {
  return (
    <Tooltip>
      <TooltipTrigger>shh!!</TooltipTrigger>
      <TooltipContent
        className="bg-black text-white p-4"
        arrowClassName="bg-black"
      >
        QUIET! OR THEY'LL HEAR US!
      </TooltipContent>
    </Tooltip>
  );
};
