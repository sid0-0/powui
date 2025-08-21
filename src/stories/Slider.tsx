import { Slider, type SliderProps } from "@/components/ui/slider";

const StorybookSlider = (props: SliderProps) => {
  return <Slider {...props} min={10} className="w-xl" />;
};

export { StorybookSlider };
