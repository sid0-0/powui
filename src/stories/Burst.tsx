import { BurstWrapper, type TBurstWrapperProps } from "@/components/ui/burst";
import { SupermanText } from "@/components/ui/supermanText";

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
      <SupermanText
        className="absolute top-0 flex items-center justify-center text-8xl italic font-extrabold text-red-700"
        style={{ height, width }}
        dx={5}
        dy={5}
        color="red"
      >
        POW!
      </SupermanText>
    </div>
  );
};

export { StorybookBurst };
