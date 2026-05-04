import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  thumbClassName?: string;
  shape?: "circular" | "rectangular";
  trackClassName?: string;
  rangeClassName?: string;
  thickness?: number | string;
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  thumbClassName,
  shape = "circular",
  trackClassName = "",
  rangeClassName = "",
  thickness = 16,
  style,
  ...props
}: SliderProps) {
  const thicknessValue =
    typeof thickness === "number" ? `${thickness}px` : thickness;

  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  const sliderStyle = {
    ...style,
    "--slider-thickness": thicknessValue,
    "--slider-thumb-size": thicknessValue,
    "--slider-thumb-rect-height": thicknessValue,
    "--slider-thumb-rect-width": `calc(${thicknessValue} * 1.5)`,
  } as React.CSSProperties;

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "border border-solid border-primary rounded-full",
        className
      )}
      style={sliderStyle}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden data-[orientation=horizontal]:h-[var(--slider-thickness)] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[var(--slider-thickness)]",
          "border border-solid border-secondary rounded-full",
          trackClassName
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-amber-400 absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
            rangeClassName
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "border-primary bg-background ring-ring/50 block shrink-0 border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
            shape === "circular" &&
              "rounded-full size-[var(--slider-thumb-size)] active:scale-200 ",
            shape === "rectangular" &&
              "h-[var(--slider-thumb-rect-height)] w-[var(--slider-thumb-rect-width)] rounded-xs flex items-center justify-center active:scale-150 ",
            "active:cursor-grabbing cursor-grab scale-125",
            thumbClassName
          )}
        >
          <div
            className={cn(
              "rounded-[inherit] h-4/5 w-full",
              "flex items-stretch justify-center"
            )}
            style={{ gap: "calc(var(--slider-thickness) * 0.1875)" }}
          >
            {shape === "rectangular" && Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-zinc-800"
                  style={{ width: "calc(var(--slider-thickness) * 0.0625)" }}
                />
              ))}
          </div>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
