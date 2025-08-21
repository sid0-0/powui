import { getEllipticalPoints, getRectangularPoints } from "@/lib/geometryUtils";
import { cn } from "@/lib/utils";
import type React from "react";
import { useMemo, useState } from "react";

const HEIGHT_VARIANCE = 15;
const FLATTERY_FACTOR = 2;

const generateSVGPathBAM = (args: {
  points: { x: number; y: number }[];
  height: number;
  width: number;
  flatteryFactor: number;
  curvedDips?: boolean;
}) => {
  const { points, height, width, flatteryFactor } = args;
  const path = [...points, points[0]].reduce((acc, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    } else {
      const previousPoint = points[index - 1];
      const referencePoint = {
        x:
          (width / 2 + flatteryFactor * ((point.x + previousPoint.x) / 2)) /
          (1 + flatteryFactor),
        y:
          (height / 2 + flatteryFactor * ((point.y + previousPoint.y) / 2)) /
          (1 + flatteryFactor),
      };
      if (args.curvedDips) {
        return `${acc} Q ${referencePoint.x} ${referencePoint.y}, ${point.x} ${point.y}`;
      }
      return `${acc} L ${referencePoint.x} ${referencePoint.y} L ${point.x} ${point.y}`;
    }
  }, "");

  return `${path} Z`;
};

const getPointsAndPath = (args: {
  height: number;
  width: number;
  heightVariance: number;
  peakSeparation: number;
  flatteryFactor: number;
  huggingStyle: "elliptical" | "rectangular";
  curvedDips?: boolean;
}) => {
  const {
    height,
    width,
    heightVariance,
    peakSeparation,
    flatteryFactor,
    curvedDips,
  } = args;
  if (height === 0 || width === 0) {
    return { points: [], path: "" };
  }

  let points: { x: number; y: number }[] = [];
  if (args.huggingStyle === "rectangular") {
    points = getRectangularPoints({
      height,
      width,
      peakSeparation,
      heightVariance,
    });
  } else {
    points = getEllipticalPoints({
      height,
      width,
      peakSeparation,
      heightVariance,
    });
  }
  const path = generateSVGPathBAM({
    points,
    height,
    width,
    flatteryFactor,
    curvedDips,
  });
  return { points, path };
};

type TBurstWrapperProps = {
  heightVariance?: number;
  // peakSeparation is used to determine distance between each peak
  peakSeparation?: number;
  // change this prop name at some point
  // flatteryFactor is a factor that determines how much the points are "flattened"
  flatteryFactor?: number;
  // huggingStyle determines the shape of the burst
  huggingStyle?: "elliptical" | "rectangular";
  // curvedDips determines if the dips between peaks are curved or not
  curvedDips?: boolean;
  // borders determines the appearance of the borders around the burst
  borders?: {
    scale?: number;
    color?: CSSStyleDeclaration["backgroundColor"];
  }[];
  // containerClassName is a class name to apply to the container div
  containerClassName?: string;
};

const BurstWrapper = (
  props: TBurstWrapperProps & {
    children: React.ReactNode;
  }
) => {
  const {
    children,
    heightVariance = HEIGHT_VARIANCE,
    flatteryFactor = FLATTERY_FACTOR,
    huggingStyle = "elliptical",
    curvedDips = false,
    borders = [],
    containerClassName,
  } = props;

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const { height = 0, width = 0 } = containerRef?.getBoundingClientRect() ?? {};

  const peakSeparation = props.peakSeparation ?? (height + width) / 10;

  const svgPath = useMemo(() => {
    return getPointsAndPath({
      height,
      width,
      heightVariance,
      peakSeparation,
      flatteryFactor,
      huggingStyle,
      curvedDips,
    });
  }, [
    height,
    width,
    heightVariance,
    peakSeparation,
    flatteryFactor,
    huggingStyle,
    curvedDips,
  ]);

  const borderDivs = useMemo(() => {
    if (!borders) return null;
    return borders
      .slice()
      .reverse()
      .map((config, index) => (
        <div
          className="absolute scale-110 inset-0 bg-red-700"
          style={{
            clipPath: `path("${svgPath.path}")`,
            backgroundColor: config?.color ?? "black",
            scale: config?.scale ?? (borders.length - 1 - index + 11) / 10,
          }}
        />
      ));
  }, [borders, svgPath.path]);

  return (
    <div className={cn("relative", containerClassName)}>
      {borderDivs}
      <div
        ref={setContainerRef}
        style={{ clipPath: `path("${svgPath.path}")` }}
      >
        {children}
      </div>
    </div>
  );
};

export { BurstWrapper, type TBurstWrapperProps };
