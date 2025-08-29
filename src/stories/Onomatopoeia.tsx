import { useEventOnomatopoeia } from "@/components/ui/onomatopoeia";

const StorybookOnomatopoeia = () => {
  const [trigger] = useEventOnomatopoeia({
    text: "Boom!",
  });

  return (
    <div
      onClick={(event) => trigger({ x: event.clientX, y: event.clientY })}
      className="p-8 border border-dashed border-black flex items-center justify-center select-none cursor-pointer"
    >
      Click anywhere
    </div>
  );
};

export { StorybookOnomatopoeia };
