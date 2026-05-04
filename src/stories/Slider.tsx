import { Slider, type SliderProps } from "@/components/ui/slider";
import { Filters } from "@/components/ui/filters";

const StorybookSlider = (props: SliderProps) => {
  return (
    <Filters.Displacement>
      <Slider rangeClassName="spotty-bg-[#eab308]" {...props} />
    </Filters.Displacement>
  );
};

export { StorybookSlider };
