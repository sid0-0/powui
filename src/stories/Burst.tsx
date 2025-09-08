import { BurstWrapper, type TBurstWrapperProps } from "@/components/ui/burst";

const StorybookBurst = (
  props: {
    height?: number;
    width?: number;
  } & TBurstWrapperProps
) => {
  const { height = 240, width = 240, ...rest } = props;
  return (
    <div className="relative -rotate-30">
      <BurstWrapper {...rest}>
        <div style={{ height, width }}></div>
      </BurstWrapper>
      <div
        className="absolute top-0 flex items-center justify-center text-8xl italic font-extrabold text-red-700"
        style={{ height, width, textShadow: '1px 1px red, 3px 3px red, 5px 5px red' }}
      >
        POW!
      </div>
    </div>
  );
};

export { StorybookBurst };
