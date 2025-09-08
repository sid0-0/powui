import { cn } from "@/lib/utils";
import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

type TEvaluateContainerStyleArgs = {
  x: number;
  y: number;
  duration?: number;
  addRandomness?: boolean;
  displayElement?: React.ReactNode;
};

const ClickBurst = () => {
  const lineLength = 20;

  const allPoints = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    return {
      x1: lineLength,
      y1: lineLength,
      x2: lineLength + Math.cos(angle) * lineLength,
      y2: lineLength + Math.sin(angle) * lineLength,
    };
  });

  const svg = (
    <svg
      height={lineLength * 2}
      width={lineLength * 2}
      viewBox={`0 0 ${lineLength * 2} ${lineLength * 2}`}
      xmlns="http://www.w3.org/2000/svg"
      className="-translate-1/2 filter-[url(#displacementFilter)]"
      aria-hidden="false"
      role="img"
    >
      {allPoints.map((point, index) => (
        <line
          key={index}
          style={{
            stroke: "black",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeDasharray: lineLength / 2,
            strokeDashoffset: lineLength / 2,
            opacity: 0.95,
            transformBox:
              "fill-box" /* allow transform-origin to work inside SVG */,
            transformOrigin: "50% 50%" /* center of SVG */,
          }}
          x1={point.x1}
          y1={point.y1}
          x2={point.x2}
          y2={point.y2}
        ></line>
      ))}
    </svg>
  );

  return svg;
};

const evaluateContainerStyle = ({
  x,
  y,
  duration,
  addRandomness = true,
}: TEvaluateContainerStyleArgs) => {
  const evaluatedContainerStyle: CSSProperties = {
    position: "absolute" as const,
    left: x,
    top: y,
    transition: `transform ${duration}ms`,
  };
  if (addRandomness) {
    const radius = 20;
    const minimumDistance = 10;
    const translateX =
      (Math.random() > 0.5 ? 1 : -1) *
      (minimumDistance + Math.random() * radius);
    const translateY =
      (Math.random() > 0.5 ? 1 : -1) *
      (minimumDistance + Math.random() * radius);

    const angle = Math.atan(translateY / translateX);
    const rotationAngleNotAllowed = (180 * angle) / Math.PI;

    let rotationAngle = (Math.random() - 0.5) * 100;

    if (Math.abs(rotationAngle - rotationAngleNotAllowed) < 20) {
      rotationAngle = rotationAngle + 20;
    }

    evaluatedContainerStyle.translate = `calc(-50% + ${translateX}px) calc(-50% + ${translateY}px)`;
    evaluatedContainerStyle.rotate = `${rotationAngle}deg`;
  }
  return evaluatedContainerStyle;
};

export const useEventOnomatopoeia = (props: {
  containerStyle?: CSSProperties;
  showClickBurst?: boolean;
  displayElement?: React.ReactNode;
}) => {
  const { containerStyle = {}, showClickBurst = false, displayElement } = props;
  const [portalElements, setPortalElements] = useState<Record<string, any>>({});
  const trigger = useCallback(
    (args: TEvaluateContainerStyleArgs) => {
      const {
        x,
        y,
        duration = 200,
        displayElement: triggerDisplayElement,
      } = args;
      if (!x || !y) return;
      const evaluatedContainerStyle = evaluateContainerStyle(args);
      const id = window.crypto.randomUUID();

      const finalDisplayElement = triggerDisplayElement ?? displayElement;

      const items = [
        finalDisplayElement &&
          createPortal(
            <div
              className={cn(
                "select-none pointer-events-none absolute text-xl",
                "filter-[url(#displacementFilter)]"
              )}
              style={evaluatedContainerStyle}
            >
              {finalDisplayElement}
            </div>,
            document.body
          ),
        showClickBurst &&
          createPortal(
            <div
              className="select-none pointer-events-none absolute text-xl"
              style={evaluateContainerStyle({ ...args, addRandomness: false })}
            >
              <ClickBurst key="burst" />
            </div>,
            document.body
          ),
      ];

      setPortalElements((current) => ({
        ...current,
        ...items.reduce(
          (acc, item, index) => ({
            ...acc,
            [`${id}_${index}`]: item,
          }),
          {}
        ),
      }));
      setTimeout(() => {
        setPortalElements((current) => {
          const newState = { ...current };
          items.forEach((_, index) => {
            delete newState[`${id}_${index}`];
          });
          return newState;
        });
      }, duration);
    },
    [containerStyle, displayElement]
  );

  const renderedPortalElements = useMemo(
    () => <>{Object.values(portalElements)}</>,
    [portalElements]
  );

  return { domElement: renderedPortalElements, trigger };
};
