import { ImpactWrapper } from "@/components/ui/impact";

const StorybookImpact = (props: {
  height?: number;
  width?: number;
  heightVariance?: number;
  distanceBetweenPeaks?: number;
  flatteryFactor?: number;
}) => {
  const {
    height = 240,
    width = 240,
    heightVariance,
    distanceBetweenPeaks,
    flatteryFactor,
  } = props;
  return (
    <ImpactWrapper
      heightVariance={heightVariance}
      distanceBetweenPeaks={distanceBetweenPeaks}
      flatteryFactor={flatteryFactor}
    >
      <div
        className="flex items-center justify-center bg-amber-400 text-2xl italic"
        style={{ height, width }}
      >
        POW!
      </div>
    </ImpactWrapper>
  );
};

export { StorybookImpact };
