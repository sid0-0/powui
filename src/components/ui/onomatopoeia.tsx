import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export const Onomatopoeia = (props: { text: string }) => {
  const { text } = props;
  return (
    <span className="filter-[url(#displacementFilter)] font-[Walter_Turncoat]">
      {text}
    </span>
  );
};

export const useEventOnomatopoeia = (props: { text: string }) => {
  const { text } = props;
  const [portalElements, setPortalElements] = useState<Record<string, any>>({});
  const trigger = useCallback(
    (args: { x: number; y: number; duration?: number }) => {
      const { x, y, duration = 1000 } = args;
      if (!x || !y) return;
      const id = window.crypto.randomUUID();
      setPortalElements((current) => ({
        ...current,
        [id]: createPortal(
          <div
            className="select-none pointer-events-none absolute text-xl"
            style={{ left: x, top: y }}
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
