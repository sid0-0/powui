import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
      className="filter-[url(#displacementFilter)] font-[Walter_Turncoat] transition duration-100"
      ref={elemRef}
    >
      {text}
    </div>
  );
};

export const useEventOnomatopoeia = (props: { text: string }) => {
  const { text } = props;
  const [portalElements, setPortalElements] = useState<Record<string, any>>({});
  const trigger = useCallback(
    (args: { x: number; y: number; duration?: number }) => {
      const { x, y, duration = 500 } = args;
      if (!x || !y) return;
      const radius = 20;
      const minimumDistance = 10;
      const translateX =
        (Math.random() > 0.5 ? 1 : -1) *
        (minimumDistance + Math.random() * radius);
      const translateY =
        (Math.random() > 0.5 ? 1 : -1) *
        (minimumDistance + Math.random() * radius);
      const id = window.crypto.randomUUID();
      setPortalElements((current) => ({
        ...current,
        [id]: createPortal(
          <div
            className="select-none pointer-events-none absolute text-xl"
            style={{
              left: x,
              top: y,
              rotate: `${(Math.random() - 0.5) * 90}deg`,
              translate: `calc(-50% + ${translateX}px) calc(-50% + ${translateY}px)`,
            }}
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
    []
  );

  const renderedPortalElements = useMemo(
    () => <>{Object.values(portalElements)}</>,
    [portalElements]
  );

  return { domElement: renderedPortalElements, trigger };
};
