import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

import styles from "@/styles/tooltip.module.scss";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  shape,
  arrowClassName,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  shape?: "elliptical" | "square";
  arrowClassName?: string;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        <div
          className={cn(
            shape === "elliptical" ? "clip-path-ellipse" : "rounded-full",
            "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
            className
          )}
        >
          {children}
        </div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

const TooltipContainer = ({
  triggerContent = "Hover me",
  content = "Tooltip content",
  className = "",
  arrowClassName = "",
  side = "top",
}: {
  triggerContent?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  arrowClassName?: string;
  side?: TooltipPrimitive.TooltipContentProps["side"];
}) => {
  let sideOffset = 20;
  if (side === "left" || side === "right") {
    sideOffset += 12; // Adjust for horizontal sides
  }

  return (
    <Tooltip>
      <TooltipTrigger>{triggerContent}</TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn(
          "relative bg-white border-4 border-black text-black font-comic rounded-2xl px-4 py-3 shadow-[4px_4px_0px_black]",
          styles.bounceMount,
          "filter-[url(#displacementFilter)]",
          className
        )}
        sideOffset={sideOffset}
      >
        {content}
        <div
          className={cn(
            side === "top" && "translate-y-full -translate-x-1/2 left-1/2",
            side === "bottom" &&
              "rotate-180 -translate-x-1/2 left-1/2 top-0 -translate-y-full",
            side === "right" &&
              "rotate-90 top-1/2 -translate-y-1/2 right-full -translate-x-1/2",
            side === "left" &&
              "-rotate-90 top-1/2 -translate-y-1/2 left-full translate-x-1/2",
            "filter-[url(#displacementFilter)]",
            styles.comicArrow,
            arrowClassName
          )}
        />
      </TooltipContent>
    </Tooltip>
  );
};

export { TooltipContainer as Tooltip };
