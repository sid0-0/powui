import { BurstWrapper, type TBurstWrapperProps } from "@/components/ui/burst";

const StorybookBurst = (
  props: {
    height?: number;
    width?: number;
  } & TBurstWrapperProps
) => {
  const {
    height = 240,
    width = 240,
    heightVariance,
    peakSeparation,
    flatteryFactor,
    huggingStyle = "elliptical",
  } = props;
  return (
    <BurstWrapper
      heightVariance={heightVariance}
      peakSeparation={peakSeparation}
      flatteryFactor={flatteryFactor}
      huggingStyle={huggingStyle}
    >
      <div
        className="flex items-center justify-center bg-amber-400 text-2xl italic"
        style={{ height, width }}
      >
        POW!
      </div>
    </BurstWrapper>
  );
};

export { StorybookBurst };
