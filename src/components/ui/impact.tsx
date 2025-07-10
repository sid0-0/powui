import type React from "react";
import { useCallback, useMemo, useState } from "react";

const MAX_LENGTH = 30;
const HEIGHT_VARIANCE = 15;
const FLATTERY_FACTOR = 2;

const resolvePointsFromLine = (
  points: number[][],
  height: number,
  width: number
) => {
  const resolvedPoints = points.map((point) => {
    const x = point[0];
    const y = point[1];
    if (x <= width) {
      return { x, y };
    } else if (x <= width + height) {
      return { x: width - y, y: x - width };
    } else if (x <= width + height + width) {
      return { x: width - (x - (height + width)), y: height - y };
    } else {
      return { x: y, y: height - (x - (width + height + width)) };
    }
  });

  return resolvedPoints;
};

// generate a straight line of points
// with a random height variance
const getPoints = (args: {
  height: number;
  width: number;
  distanceBetweenPeaks: number;
  heightVariance: number;
}) => {
  const { height, width, distanceBetweenPeaks, heightVariance } = args;
  const pickPoints = [];
  let currentX = 0;

  while (currentX < 2 * (width + height)) {
    currentX =
      currentX +
      distanceBetweenPeaks +
      (Math.random() - 0.5) * distanceBetweenPeaks;

    pickPoints.push([currentX, Math.random() * heightVariance]);
  }
  return resolvePointsFromLine(pickPoints, height, width);
};

const generateSVGPathCloud = (args: {
  points: { x: number; y: number }[];
  height: number;
  width: number;
  flatteryFactor: number;
}) => {
  const { points, height, width, flatteryFactor } = args;
  const withLastPoint = [...points, points[0]];
  const path = withLastPoint.reduce((acc, point, index) => {
    const nextPoint =
      index !== withLastPoint.length - 1 ? withLastPoint[index + 1] : points[1];

    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    } else {
      const referencePoint = {
        x:
          (width / 2 + flatteryFactor * ((point.x + nextPoint.x) / 2)) /
          (1 + flatteryFactor),
        y:
          (height / 2 + flatteryFactor * ((point.y + nextPoint.y) / 2)) /
          (1 + flatteryFactor),
      };

      return `${acc} Q ${point.x} ${point.y}, ${referencePoint.x} ${referencePoint.y}`;
    }
  }, "");
  return `${path} Z`;
};

const generateSVGPathBAM = (args: {
  points: { x: number; y: number }[];
  height: number;
  width: number;
  flatteryFactor: number;
}) => {
  const { points, height, width, flatteryFactor } = args;
  const withLastPoint = [...points, points[0]];

  const path = withLastPoint.reduce((acc, point, index) => {
    const previousPoint =
      index !== 0
        ? withLastPoint[index - 1]
        : withLastPoint[withLastPoint.length - 1];

    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    } else {
      const referencePoint = {
        x:
          (width / 2 + flatteryFactor * ((point.x + previousPoint.x) / 2)) /
          (1 + flatteryFactor),
        y:
          (height / 2 + flatteryFactor * ((point.y + previousPoint.y) / 2)) /
          (1 + flatteryFactor),
      };

      return `${acc} Q ${referencePoint.x} ${referencePoint.y}, ${point.x} ${point.y}`;
    }
  }, "");
  return `${path} Z`;
};

const getPointsAndPath = (args: {
  height: number;
  width: number;
  heightVariance: number;
  distanceBetweenPeaks: number;
  flatteryFactor: number;
}) => {
  const {
    height,
    width,
    heightVariance,
    distanceBetweenPeaks,
    flatteryFactor,
  } = args;
  if (height === 0 || width === 0) {
    return { points: [], path: "" };
  }
  const points = getPoints(
    {
      height,
      width,
      distanceBetweenPeaks,
      heightVariance,
    }
    // flatteryFactor
  );
  const path = generateSVGPathBAM({ points, height, width, flatteryFactor });
  //   const path = generateSVGPathCloud(points, height, width);
  return { points, path };
};

const ImpactWrapper = (props: {
  children: React.ReactNode;
  // heightVariance determines how low each peak can be
  heightVariance?: number;
  // distanceBetweenPoints is used to determine distance between each peak
  distanceBetweenPeaks?: number;
  // change this prop name at some point
  // flatteryFactor is a factor that determines how much the points are "flattened"
  flatteryFactor?: number;
}) => {
  const {
    children,
    heightVariance = HEIGHT_VARIANCE,
    distanceBetweenPeaks = MAX_LENGTH,
    flatteryFactor = FLATTERY_FACTOR,
  } = props;
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const loadRef = useCallback((node: HTMLDivElement | null) => {
    setContainerRef(node);
  }, []);

  const { height = 0, width = 0 } = containerRef?.getBoundingClientRect() ?? {};

  const svgPath = useMemo(() => {
    return getPointsAndPath({
      height,
      width,
      heightVariance,
      distanceBetweenPeaks,
      flatteryFactor,
    });
  }, [height, width, heightVariance, distanceBetweenPeaks, flatteryFactor]);

  return (
    <div ref={loadRef} style={{ clipPath: `path("${svgPath.path}")` }}>
      {children}
    </div>
  );
};

export { ImpactWrapper };
