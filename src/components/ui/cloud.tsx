import type React from "react";
import { getEllipticalPoints, getRectangularPoints } from "@/lib/geometryUtils";
import { useCallback, useMemo, useState } from "react";

const HEIGHT_VARIANCE = 15;
const FLATTERY_FACTOR = 2;

const generateSVGPathCloud = (args: {
  points: { x: number; y: number }[];
  height: number;
  width: number;
  flatteryFactor: number;
}) => {
  const { points, height, width, flatteryFactor } = args;

  let firstTrough = { x: 0, y: 0 };
  const path = points.reduce((acc, point, index) => {
    const nextPoint = points[index + 1] || points[0];
    const trough = {
      x:
        (width / 2 + flatteryFactor * ((point.x + nextPoint.x) / 2)) /
        (1 + flatteryFactor),
      y:
        (height / 2 + flatteryFactor * ((point.y + nextPoint.y) / 2)) /
        (1 + flatteryFactor),
    };

    if (index === 0) {
      firstTrough = trough;
      return `M ${trough.x} ${trough.y}`;
    } else {
      return `${acc} Q ${point.x} ${point.y}, ${trough.x} ${trough.y}`;
    }
  }, "");

  return `${path} Q ${points[0].x} ${points[0].y}, ${firstTrough.x} ${firstTrough.y} Z`;
};

const getPointsAndPath = (args: {
  height: number;
  width: number;
  heightVariance: number;
  peakSeparation: number;
  flatteryFactor: number;
  huggingStyle: "elliptical" | "rectangular";
}) => {
  const {
    height,
    width,
    heightVariance,
    peakSeparation,
    flatteryFactor,
    huggingStyle,
  } = args;
  if (height === 0 || width === 0) {
    return { points: [], path: "" };
  }

  let points: { x: number; y: number }[] = [];
  if (huggingStyle === "rectangular") {
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
  const path = generateSVGPathCloud({ points, height, width, flatteryFactor });
  return { points, path };
};

type TCloudWrapperProps = {
  children: React.ReactNode;
  // heightVariance determines how low each peak can be
  heightVariance?: number;
  // peakSeparation is used to determine distance between each peak
  peakSeparation?: number;
  // change this prop name at some point
  // flatteryFactor is a factor that determines how much the points are "flattened"
  flatteryFactor?: number;
  // huggingStyle determines the shape of the cloud
  huggingStyle?: "elliptical" | "rectangular";
};

const CloudWrapper = (props: TCloudWrapperProps) => {
  const {
    children,
    heightVariance = HEIGHT_VARIANCE,
    flatteryFactor = FLATTERY_FACTOR,
    huggingStyle = "elliptical",
  } = props;

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const loadRef = useCallback((node: HTMLDivElement | null) => {
    setContainerRef(node);
  }, []);

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
    });
  }, [height, width, heightVariance, peakSeparation, flatteryFactor]);

  return (
    <div ref={loadRef} style={{ clipPath: `path("${svgPath.path}")` }}>
      {children}
    </div>
  );
};

export { CloudWrapper, type TCloudWrapperProps };
