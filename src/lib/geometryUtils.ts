const resolvePointsFromLine = (
  points: { x: number; y: number }[],
  height: number,
  width: number
) => {
  const resolvedPoints = points.map((point) => {
    const { x, y } = point;
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

    pickPoints.push({ x: currentX, y: Math.random() * heightVariance });
  }

  const distanceBetweenFirstAndLast = Math.sqrt(
    Math.pow(pickPoints[0].x - pickPoints[pickPoints.length - 1].x, 2) +
      Math.pow(pickPoints[0].y - pickPoints[pickPoints.length - 1].y, 2)
  );

  if (distanceBetweenFirstAndLast < 0.4 * peakSeparation) {
    pickPoints.splice(pickPoints.length - 1, 1);
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

  const r = (width + height) / 4;
  const theta = peakSeparation / r;
  const a = width / 2;
  const b = height / 2;
  const peaksCounts = Math.ceil((2 * Math.PI) / theta);

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

  const distanceBetweenFirstAndLast = Math.sqrt(
    Math.pow(pickPoints[0].x - pickPoints[pickPoints.length - 1].x, 2) +
      Math.pow(pickPoints[0].y - pickPoints[pickPoints.length - 1].y, 2)
  );

  if (distanceBetweenFirstAndLast < 0.4 * peakSeparation) {
    pickPoints.splice(pickPoints.length - 1, 1);
  }

  return pickPoints;
};
