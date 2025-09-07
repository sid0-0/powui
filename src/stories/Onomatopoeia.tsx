import { useEventOnomatopoeia } from "@/components/ui/onomatopoeia";

const StorybookOnomatopoeia = () => {
  const { domElement, trigger } = useEventOnomatopoeia({
    showClickBurst: true,
  });

  return (
    <div
      onClick={(event) => {
        trigger({
          x: event.clientX,
          y: event.clientY,
          displayElement: (
            <div className="font-[Walter_Turncoat] text-2xl">Click</div>
          ),
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
