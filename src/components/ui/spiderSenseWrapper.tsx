"use client";

/**
 * Credits to Mike Quinn for the original snippet which inspired this whole project
 * https://codepen.io/mprquinn/pen/OmOMrR
 */

import { pickRandomFromArray } from "@/utils/general";
import mojs from "@mojs/core";
import { useCallback, useEffect, useMemo, useRef } from "react";

function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  ms: number,
): (...args: Args) => void {
  let lastTime = 0;
  return (...args: Args) => {
    const now = Date.now();
    if (now - lastTime < ms) return;
    lastTime = now;
    fn(...args);
  };
}

export const COLORS_LIST = [
  {
    name: "Vibrant Red",
    hex: "#FF0000",
  },
  {
    name: "Electric Blue",
    hex: "#00FFFF",
  },
  {
    name: "Bright Orange",
    hex: "#FF8C00",
  },
  {
    name: "Lime Green",
    hex: "#32CD32",
  },
  {
    name: "Shocking Pink",
    hex: "#FF1493",
  },
  {
    name: "Deep Magenta",
    hex: "#FF00FF",
  },
  {
    name: "Sunny Yellow",
    hex: "#FFD700",
  },
  {
    name: "Royal Blue",
    hex: "#4169E1",
  },
  {
    name: "Fluorescent Green",
    hex: "#00FF7F",
  },
  {
    name: "Hot Pink",
    hex: "#FF69B4",
  },
  {
    name: "Electric Violet",
    hex: "#8A2BE2",
  },
  {
    name: "Crimson Red",
    hex: "#DC143C",
  },
  {
    name: "Aqua Marine",
    hex: "#7FFFD4",
  },
  {
    name: "Gold",
    hex: "#FFBF00",
  },
  {
    name: "Deep Sky Blue",
    hex: "#00BFFF",
  },
];

const SpiderSenseWrapper = (
  props: React.PropsWithChildren<{
    children: React.ReactNode;
    shape?: "zigzag" | "line";
    color?: string;
    trigger?: "hover" | "click" | "mount" | "manual";
    getManualTrigger?: (trigger: () => void) => void;
    containerClassName?: string;
  }>,
) => {
  const {
    children,
    color,
    shape,
    trigger = "hover",
    getManualTrigger,
    containerClassName,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const shootLines = useCallback(() => {
    if (!containerRef.current) return;
    const windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    const itemDim = containerRef.current.getBoundingClientRect(),
      itemSize = {
        x: itemDim.right - itemDim.left,
        y: itemDim.bottom - itemDim.top,
      };

    const chosenColor =
      color ?? pickRandomFromArray(COLORS_LIST.map((x) => x.hex));
    const chosenShape = shape ?? pickRandomFromArray(["line", "zigzag"]);

    const averageRadius = (itemSize.x + itemSize.y) / 4;
    const circumference = Math.PI * (itemSize.x + itemSize.y);

    const burst = new mojs.Burst({
      left: itemDim.left + itemSize.x / 2 + window.scrollX,
      top: itemDim.top + itemSize.y / 2 + window.scrollY,
      radiusX: itemSize.x + averageRadius / 5,
      radiusY: itemSize.y + averageRadius / 5,
      count: Math.max(4, circumference / 50),

      children: {
        shape: chosenShape,
        radius: averageRadius / 6,
        scale: {
          [windowWidth / (itemDim.width * 6)]:
            windowHeight / (itemDim.height * 6),
        },
        fill: "none",
        points: 7,
        stroke: chosenColor,
        strokeDasharray: "100%",
        strokeDashoffset: { "-100%": "100%" },
        strokeWidth: averageRadius / 30,
        duration: 500,
        easing: "quad.out",
        isShowEnd: false,
      },
    });

    burst.play();
  }, [color, shape]);

  const throttledShootLines = useMemo(
    () => throttle(shootLines, 400),
    [shootLines],
  );

  useEffect(() => {
    getManualTrigger?.(throttledShootLines);
  }, [getManualTrigger, throttledShootLines]);

  const registerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        containerRef.current = node;
        if (trigger === "mount") {
          setTimeout(throttledShootLines, 0);
        }
      }
    },
    [throttledShootLines],
  );

  return (
    <div
      ref={registerRef}
      onMouseOver={trigger === "hover" ? throttledShootLines : () => {}}
      onClick={trigger === "click" ? throttledShootLines : () => {}}
      className={containerClassName}
    >
      {children}
    </div>
  );
};

export { SpiderSenseWrapper };
