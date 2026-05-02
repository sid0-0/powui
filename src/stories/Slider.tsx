import { Slider, type SliderProps } from "@/components/ui/slider";

const StorybookSlider = (props: SliderProps) => {
  return <Slider rangeClassName="spotty-bg-[#eab308]" {...props} />;
};

export { StorybookSlider };
