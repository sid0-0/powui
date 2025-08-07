import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

import styles from "@/styles/tooltip.module.scss";

export const StorybookTooltip = () => {
  console.log(styles);
  return (
    <Tooltip>
      <TooltipTrigger className="border-black">shh!!</TooltipTrigger>
      <TooltipContent  className="bg-black text-white">
        QUIET! OR THEY'LL HEAR US!
      </TooltipContent>
    </Tooltip>
  );
};
