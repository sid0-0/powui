import { CloudWrapper, type TCloudWrapperProps } from "@/components/ui/cloud";

const StorybookCloud = (
  props: {
    height?: number;
    width?: number;
  } & Pick<
    TCloudWrapperProps,
    "heightVariance" | "peakSeparation" | "flatteryFactor" | "huggingStyle"
  >
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
    <CloudWrapper
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
    </CloudWrapper>
  );
};

export { StorybookCloud };
