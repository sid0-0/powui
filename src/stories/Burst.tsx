import { BurstWrapper, type TBurstWrapperProps } from "@/components/ui/burst";

const StorybookBurst = (
  props: {
    height?: number;
    width?: number;
  } & TBurstWrapperProps
) => {
  const { height = 240, width = 240, ...rest } = props;
  return (
    <BurstWrapper {...rest}>
      <div
        className="flex items-center justify-center text-2xl italic spotty-bg-[#eab308]"
        style={{ height, width }}
      >
        POW!
      </div>
    </BurstWrapper>
  );
};

export { StorybookBurst };
