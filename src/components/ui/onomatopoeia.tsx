import { createPortal } from "react-dom";

export const Onomatopoeia = (props: { text: string }) => {
  const { text } = props;
  return <span className="filter-[url(#displacementFilter)]">{text}</span>;
};

export const useEventOnomatopoeia = (props: { text: string }) => {
  const { text } = props;
  const trigger = (args: { x: number; y: number }) => {
    const { x, y } = args;
    if (!x || !y) return;
    // const bcr = target.getBoundingClientRect();
    createPortal(
      <div
        className="filter-[url(#displacementFilter)]"
        style={{
          position: "absolute",
          left: x,
          top: y,
          //   width: bcr.width,
          //   height: bcr.height,
        }}
      >
        <Onomatopoeia text={text} />
      </div>,
      document.body
    );
  };
  return [trigger];
};
