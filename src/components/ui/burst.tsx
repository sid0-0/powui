import type React from "react";
import { useCallback, useMemo, useState } from "react";

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
const getRectangularPoints = (args: {
  height: number;
  width: number;
  peakSeparation: number;
  heightVariance: number;
}) => {
  const { height, width, peakSeparation, heightVariance } = args;
  const pickPoints = [];
  let currentX = 0;

  while (currentX < 2 * (width + height)) {
    currentX = currentX + (0.5 + Math.random()) * peakSeparation;

    pickPoints.push([currentX, Math.random() * heightVariance]);
  }
  return resolvePointsFromLine(pickPoints, height, width);
};

const getEllipticalPoints = (args: {
  height: number;
  width: number;
  peakSeparation: number;
  heightVariance: number;
}) => {
  const { height, width, peakSeparation, heightVariance } = args;

  const theta = (2 * peakSeparation) / (width + height);
  const a = width / 2;
  const b = height / 2;
  let peaksCounts = Math.ceil((2 * Math.PI) / theta);

  const pickPoints = Array(peaksCounts)
    .fill(null)
    .map((_, index) => ({
      x:
        a +
        a * Math.cos(theta * index) +
        (Math.random() - 0.5) * heightVariance,
      y:
        b +
        b * Math.sin(theta * index) +
        (Math.random() - 0.5) * heightVariance,
    }));

  return pickPoints;
};

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

const generateSVGPathBAM = (args: {
  points: { x: number; y: number }[];
  height: number;
  width: number;
  flatteryFactor: number;
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

      return `${acc} Q ${referencePoint.x} ${referencePoint.y}, ${point.x} ${point.y}`;
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
}) => {
  const { height, width, heightVariance, peakSeparation, flatteryFactor } =
    args;
  if (height === 0 || width === 0) {
    return { points: [], path: "" };
  }
  const points = getRectangularPoints({
    height,
    width,
    peakSeparation,
    heightVariance,
  });
  // const points = getEllipticalPoints({
  //   height,
  //   width,
  //   peakSeparation,
  //   heightVariance,
  // });
  // const path = generateSVGPathBAM({ points, height, width, flatteryFactor });
  const path = generateSVGPathCloud({ points, height, width, flatteryFactor });
  return { points, path };
};

const BurstWrapper = (props: {
  children: React.ReactNode;
  // heightVariance determines how low each peak can be
  heightVariance?: number;
  // peakSeparation is used to determine distance between each peak
  peakSeparation?: number;
  // change this prop name at some point
  // flatteryFactor is a factor that determines how much the points are "flattened"
  flatteryFactor?: number;
}) => {
  const {
    children,
    heightVariance = HEIGHT_VARIANCE,
    flatteryFactor = FLATTERY_FACTOR,
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
    });
  }, [height, width, heightVariance, peakSeparation, flatteryFactor]);

  return (
    <div ref={loadRef} style={{ clipPath: `path("${svgPath.path}")` }}>
      {children}
    </div>
  );
};

export { BurstWrapper };
