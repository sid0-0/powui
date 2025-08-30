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

const BubbleSvg = ({ bubblePath = "" }: { bubblePath: string }) => {
  const [pathRef, setPathRef] = React.useState<SVGPathElement | null>(null);

  const pathLength = React.useMemo(() => {
    if (pathRef) {
      return pathRef.getTotalLength();
    }
    return 0;
  }, [pathRef]);

  const bubbleArc = React.useMemo(() => {
    if (bubblePath === "arc") {
      return "M 50 0 Q 70 60 0 100";
    }
    if (bubblePath === "normal") {
      return "M 50 0 L 50 100";
    }
    return bubblePath; // Use custom path if provided
  }, [bubblePath]);

  const bubbles = React.useMemo(() => {
    if (!pathLength) return null;
    const bubbleCount = 3;
    const firstBubbleRadius = 8;
    const radiusDiff = 5;
    const animationTime = 300;
    const lastBubbleRadius = firstBubbleRadius + (bubbleCount - 1) * radiusDiff;

    const radiusOfAllBubbles = Array.from(
      { length: bubbleCount },
      (_, i) => firstBubbleRadius + i * radiusDiff
    ).reduce((acc, r) => acc + r, 0);

    const safetyDistanceOnBothEnds = 5;

    const distanceBetweenBubbles =
      (pathLength - 2 * radiusOfAllBubbles - 2 * safetyDistanceOnBothEnds) /
      (bubbleCount - 1);

    const allBubblesPositions: number[] = [];

    Array.from({ length: bubbleCount }, (_, i) => {
      const currentBubbleRadius = lastBubbleRadius - i * radiusDiff;
      let position = currentBubbleRadius;
      if (i > 0) {
        const prevBubbleRadius = currentBubbleRadius + radiusDiff;
        position +=
          allBubblesPositions[i - 1] +
          prevBubbleRadius +
          distanceBetweenBubbles;
      } else {
        position += safetyDistanceOnBothEnds;
      }
      allBubblesPositions.push(position);
    });

    return allBubblesPositions.map((position, index) => (
      <circle
        key={index}
        className={cn(styles.bub, styles.bubble)}
        r={firstBubbleRadius + (bubbleCount - 1 - index) * radiusDiff}
      >
        <animateMotion
          path={bubbleArc}
          dur={`${animationTime}ms`}
          end={`${(position / pathLength) * animationTime}ms`}
          fill="freeze"
        />
      </circle>
    ));
  }, [bubbleArc, pathLength]);

  const bubbleSVG = React.useMemo(() => {
    return (
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute top-full left-1/2 -translate-x-1/2 "
      >
        <path d={bubbleArc} fill="none" stroke="none" ref={setPathRef} />
        {/* <!-- bubbles sampled along the curve --> */}
        {bubbles}
      </svg>
    );
  }, [bubbleArc, bubbles]);

  return bubbleSVG;
};

const TooltipContainer = ({
  triggerContent = "Hover me",
  content = "Tooltip content",
  className = "",
  arrowClassName = "",
  side = "top",
  sideOffset = 20,
  type = "normal",
  bubblePath = "normal",
}: {
  triggerContent?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  arrowClassName?: string;
  side?: TooltipPrimitive.TooltipContentProps["side"];
  sideOffset?: TooltipPrimitive.TooltipContentProps["sideOffset"];
  type?: "normal" | "bubbles";
  bubblePath?: "normal" | "arc" | string;
}) => {
  let adjustedSideOffset = sideOffset;
  if (side === "left" || side === "right") {
    adjustedSideOffset += 12; // Adjust for horizontal sides
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
        sideOffset={adjustedSideOffset}
      >
        {content}
        {type === "normal" && (
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
        )}
        {type === "bubbles" && <BubbleSvg bubblePath={bubblePath} />}
      </TooltipContent>
    </Tooltip>
  );
};

export { TooltipContainer as Tooltip };
