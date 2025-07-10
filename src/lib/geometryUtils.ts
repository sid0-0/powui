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
export const getRectangularPoints = (args: {
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

export const getEllipticalPoints = (args: {
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
