const THICKNESSES = ["xs", "sm", "md", "lg", "xl"] as const;
const SPACINGS = ["xs", "sm", "md", "lg", "xl"] as const;
const OPACITIES = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const;
const ANGLES = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165] as const;
const VARIANTS = ["diagonal", "cross"] as const;

type Thickness = (typeof THICKNESSES)[number];
type Spacing = (typeof SPACINGS)[number];
type Opacity = (typeof OPACITIES)[number];
type Angle = 0 | 15 | 30 | 45 | 60 | 75 | 90 | 105 | 120 | 135 | 150 | 165;
type Variant = (typeof VARIANTS)[number];

export interface HatchedBgProps {
  color?: string;
  thickness?: Thickness;
  spacing?: Spacing;
  opacity?: Opacity;
  angle?: Angle;
  variant?: Variant;
}

const variantBgClass = (variant: Variant, color: string) => {
  switch (variant) {
    case "cross":
      return `hatched-bg-cross-[${color}]`;
    case "diagonal":
    default:
      return `hatched-bg-[${color}]`;
  }
};

export const StorybookHatchedBg = ({
  color = "#F3B807",
  thickness = "sm",
  spacing = "md",
  opacity = 30,
  angle = 45,
  variant = "diagonal",
}: HatchedBgProps) => {
  const thicknessClass = `hatched-thickness-${thickness}`;
  const spacingClass = `hatched-spacing-${spacing}`;
  const opacityClass = `hatched-opacity-${opacity}`;
  const angleClass = `hatched-angle-${angle}`;
  const bgClass = variantBgClass(variant, color);

  const classes = [
    thicknessClass,
    spacingClass,
    opacityClass,
    angleClass,
    bgClass,
  ].join(" ");

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className={`size-[120px] border-4 border-black ${classes}`} />
      <code className="text-xs bg-gray-100 border border-gray-300 rounded px-3 py-2 max-w-xs text-center break-all">
        {classes}
      </code>
    </div>
  );
};

/** Shows a grid of all thickness vs spacing combinations for a given color */
export const StorybookHatchedBgMatrix = ({
  color = "#F3B807",
  variant = "diagonal",
}: Pick<HatchedBgProps, "color" | "variant">) => {
  return (
    <div className="p-4 overflow-auto">
      <table className="border-collapse text-xs">
        <thead>
          <tr>
            <th className="p-2 text-left font-mono text-gray-500">
              thickness \ spacing
            </th>
            {SPACINGS.map((s) => (
              <th key={s} className="p-2 font-mono text-gray-500">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {THICKNESSES.map((th) => (
            <tr key={th}>
              <td className="p-2 font-mono text-gray-500">{th}</td>
              {SPACINGS.map((sp) => {
                const bgClass = variantBgClass(variant, color);
                return (
                  <td key={sp} className="p-1">
                    <div
                      className={`w-16 h-16 border-2 border-black hatched-thickness-${th} hatched-spacing-${sp} ${bgClass}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** Shows all opacity levels for a given thickness/spacing/color */
export const StorybookHatchedBgOpacity = ({
  color = "#F3B807",
  thickness = "sm",
  spacing = "md",
  variant = "diagonal",
}: Pick<HatchedBgProps, "color" | "thickness" | "spacing" | "variant">) => {
  return (
    <div className="flex flex-wrap gap-4 p-6 justify-center">
      {OPACITIES.map((op) => {
        const bgClass = variantBgClass(variant, color);
        return (
          <div key={op} className="flex flex-col items-center gap-2">
            <div
              className={`w-20 h-20 border-4 border-black hatched-thickness-${thickness} hatched-spacing-${spacing} hatched-opacity-${op} ${bgClass}`}
            />
            <span className="text-xs font-mono text-gray-500">{op}%</span>
          </div>
        );
      })}
    </div>
  );
};

/** Shows a sweep of angles (0°–165° in 15° steps) for a given color/thickness/spacing */
export const StorybookHatchedBgAngles = ({
  color = "#F3B807",
  thickness = "sm",
  spacing = "md",
  opacity = 80,
}: Pick<HatchedBgProps, "color" | "thickness" | "spacing" | "opacity">) => {
  const bgClass = variantBgClass("diagonal", color);
  return (
    <div className="grid grid-cols-6 gap-3 p-4 w-fit">
      {ANGLES.map((a) => (
        <div key={a} className="flex flex-col items-center gap-1">
          <div
            className={`w-20 h-20 border-4 border-black hatched-thickness-${thickness} hatched-spacing-${spacing} hatched-opacity-${opacity} hatched-angle-${a} ${bgClass}`}
          />
          <span className="text-xs font-mono text-gray-500">{a}°</span>
        </div>
      ))}
    </div>
  );
};

/** Shows all four variants side by side */
export const StorybookHatchedBgVariants = ({
  color = "#F3B807",
  thickness = "sm",
  spacing = "md",
  opacity = 90,
  angle = 45,
}: Omit<HatchedBgProps, "variant">) => {
  const shared = `hatched-thickness-${thickness} hatched-spacing-${spacing} hatched-opacity-${opacity} hatched-angle-${angle}`;
  return (
    <div className="flex flex-wrap gap-8 p-6 justify-center">
      {VARIANTS.map((v) => {
        const bgClass = variantBgClass(v, color);
        return (
          <div key={v} className="flex flex-col items-center gap-2">
            <div
              className={`w-28 h-28 border-4 border-black ${shared} ${bgClass}`}
            />
            <span className="text-xs font-mono text-gray-500">{v}</span>
          </div>
        );
      })}
    </div>
  );
};
