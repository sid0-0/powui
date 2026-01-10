import { Filters } from "@/components/ui/filters";
import { type ComponentProps } from "react";

export const StorybookFilters = (props: {
  filterType?: "Displacement" | "ChromaAberr" | "Posterize";
  componentArgs?: ComponentProps<(typeof Filters)[keyof typeof Filters]>;
}) => {
  const { filterType = "Displacement", componentArgs } = props;
  let FilterWrapper = (x: any) => x;
  let args: ComponentProps<(typeof Filters)[keyof typeof Filters]> =
    componentArgs ?? {};
  if (filterType === "Displacement") {
    FilterWrapper = Filters.Displacement;
    args = { scale: 10, frequency: 0.5, ...args };
  } else if (filterType === "ChromaAberr") {
    FilterWrapper = Filters.ChromaAberr;
    args = { offset: 3, ...args };
  } else if (filterType === "Posterize") {
    FilterWrapper = Filters.Posterize;
    args = { buckets: 5, ...args };
  }
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <h2>Original Image</h2>
        <img
          src="spiderman_test_image.jpeg"
          alt="Original Image"
          className="w-96"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2>{filterType} Filter Applied</h2>
        <FilterWrapper {...args}>
          <img
            src="spiderman_test_image.jpeg"
            alt="Image with Filter"
            className="w-96"
          />
        </FilterWrapper>
      </div>
    </div>
  );
};
