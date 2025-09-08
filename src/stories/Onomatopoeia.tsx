import { useEventOnomatopoeia } from "@/components/ui/onomatopoeia";

const StorybookOnomatopoeia = (props: {
  showClickBurst?: boolean;
  displayElement?: React.ReactNode;
}) => {
  const {
    showClickBurst,
    displayElement = (
      <div className="font-[Walter_Turncoat] text-2xl">Click</div>
    ),
  } = props;
  const { domElement, trigger } = useEventOnomatopoeia({ showClickBurst });

  return (
    <div
      onClick={(event) => {
        trigger({
          x: event.clientX,
          y: event.clientY,
          displayElement,
        });
      }}
      className="p-32 border border-dashed border-black flex items-center justify-center select-none rounded-2xl text-gray-400 text-xl"
    >
      Click anywhere
      {domElement}
    </div>
  );
};

export { StorybookOnomatopoeia };
