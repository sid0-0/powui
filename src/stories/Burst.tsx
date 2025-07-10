import { BurstWrapper } from "@/components/ui/burst";

const StorybookBurst = (props: {
  height?: number;
  width?: number;
  heightVariance?: number;
  peakSeparation?: number;
  flatteryFactor?: number;
}) => {
  const {
    height = 240,
    width = 240,
    heightVariance,
    peakSeparation,
    flatteryFactor,
  } = props;
  return (
    <BurstWrapper
      heightVariance={heightVariance}
      peakSeparation={peakSeparation}
      flatteryFactor={flatteryFactor}
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
