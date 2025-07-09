/**
 * Credits to Mike Quinn for the original snippet which inspired this whole project
 * https://codepen.io/mprquinn/pen/OmOMrR
 */

import { pickRandomFromArray } from "@/utils/general";
import mojs from "@mojs/core";
import { useCallback, useEffect, useRef } from "react";

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
  }>
) => {
  const { children, color, shape, trigger = "hover", getManualTrigger } = props;

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

    const burst = new mojs.Burst({
      left: itemDim.left + itemSize.x / 2,
      top: itemDim.top + itemSize.y / 2,
      radiusX: itemSize.x / 1.2,
      radiusY: itemSize.y / 1.2,
      count: Math.max(4, (Math.PI * averageRadius) / 20),

      children: {
        shape: chosenShape,
        radius: averageRadius / 4,
        scale: {
          [windowWidth / (itemDim.width * 6)]:
            windowHeight / (itemDim.height * 6),
        },
        fill: "none",
        points: 7,
        stroke: chosenColor,
        strokeDasharray: "100%",
        strokeDashoffset: { "-100%": "100%" },
        strokeWidth: averageRadius / 20,
        duration: 500,
        easing: "quad.out",
        isShowEnd: false,
      },
    });

    burst.play();
  }, [color, shape]);

  useEffect(() => {
    getManualTrigger?.(shootLines);
  }, [getManualTrigger, shootLines]);

  const registerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      containerRef.current = node;
      if (trigger === "mount") {
        setTimeout(shootLines, 0);
      }
    }
  }, []);

  return (
    <div
      ref={registerRef}
      onMouseOver={trigger === "hover" ? shootLines : () => {}}
      onClick={trigger === "click" ? shootLines : () => {}}
    >
      {children}
    </div>
  );
};

export { SpiderSenseWrapper };
