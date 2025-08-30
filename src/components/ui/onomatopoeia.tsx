import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

export const Onomatopoeia = (props: { text: string }) => {
  const { text } = props;
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation logic here
    setTimeout(() => {
      // add on mount style changes here
    }, 0);
    setTimeout(() => {
      // add on unmount style changes here
    }, 400);
  }, []);
  return (
    <div
      className="filter-[url(#displacementFilter)] font-[Walter_Turncoat] transition duration-100 text-2xl"
      ref={elemRef}
    >
      {text}
    </div>
  );
};

type TEvaluateContainerStyleArgs = {
  x: number;
  y: number;
  duration?: number;
  addRandomness?: boolean;
};

const evaluateContainerStyle = ({
  x,
  y,
  duration = 500,
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

    evaluatedContainerStyle.translate = `calc(-50% + ${translateX}px) calc(-50% + ${translateY}px)`;
    evaluatedContainerStyle.rotate = `${(Math.random() - 0.5) * 100}deg`;
  }
  return evaluatedContainerStyle;
};

export const useEventOnomatopoeia = (props: {
  text: string;
  containerStyle?: CSSProperties;
}) => {
  const { text, containerStyle = {} } = props;
  const [portalElements, setPortalElements] = useState<Record<string, any>>({});
  const trigger = useCallback(
    (args: TEvaluateContainerStyleArgs) => {
      const { x, y, duration = 500  } = args;
      if (!x || !y) return;
      const evaluatedContainerStyle = evaluateContainerStyle(args);
      const id = window.crypto.randomUUID();
      setPortalElements((current) => ({
        ...current,
        [id]: createPortal(
          <div
            className="select-none pointer-events-none absolute text-xl"
            style={evaluatedContainerStyle}
          >
            <Onomatopoeia text={text} />
          </div>,
          document.body
        ),
      }));
      setTimeout(() => {
        setPortalElements((current) => {
          const newState = { ...current };
          delete newState[id];
          return newState;
        });
      }, duration);
    },
    [containerStyle]
  );

  const renderedPortalElements = useMemo(
    () => <>{Object.values(portalElements)}</>,
    [portalElements]
  );

  return { domElement: renderedPortalElements, trigger };
};
