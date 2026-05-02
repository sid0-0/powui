const DOT_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
const SPACINGS = ["xs", "sm", "md", "lg", "xl"] as const;
const OPACITIES = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const;

type DotSize = (typeof DOT_SIZES)[number];
type Spacing = (typeof SPACINGS)[number];
type Opacity = (typeof OPACITIES)[number];
type Variant = "standard" | "diagonal";

export interface SpottyBgProps {
  color?: string;
  dotSize?: DotSize;
  spacing?: Spacing;
  opacity?: Opacity;
  variant?: Variant;
}

export const StorybookSpottyBg = ({
  color = "#eab308",
  dotSize = "sm",
  spacing = "sm",
  opacity = 30,
  variant = "standard",
}: SpottyBgProps) => {
  const dotClass = `spotty-dot-${dotSize}`;
  const spacingClass = `spotty-spacing-${spacing}`;
  const opacityClass = `spotty-opacity-${opacity}`;
  const bgClass =
    variant === "standard"
      ? `spotty-bg-[${color}]`
      : `spotty-bg-diagonal-[${color}]`;

  const classes = [dotClass, spacingClass, opacityClass, bgClass].join(" ");

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className={`size-[90px] border-4 border-black ${classes}`} />
      <code className="text-xs bg-gray-100 border border-gray-300 rounded px-3 py-2 max-w-xs text-center break-all">
        {classes}
      </code>
    </div>
  );
};

/** Shows a grid of all dot sizes vs spacing combinations for a given color */
export const StorybookSpottyBgMatrix = ({
  color = "#eab308",
  variant = "standard",
}: Pick<SpottyBgProps, "color" | "variant">) => {
  return (
    <div className="p-4 overflow-auto">
      <table className="border-collapse text-xs">
        <thead>
          <tr>
            <th className="p-2 text-left font-mono text-gray-500">dot \ spacing</th>
            {SPACINGS.map((s) => (
              <th key={s} className="p-2 font-mono text-gray-500">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DOT_SIZES.map((dot) => (
            <tr key={dot}>
              <td className="p-2 font-mono text-gray-500">{dot}</td>
              {SPACINGS.map((sp) => {
                const bgClass =
                  variant === "standard"
                    ? `spotty-bg-[${color}]`
                    : `spotty-bg-diagonal-[${color}]`;
                return (
                  <td key={sp} className="p-1">
                    <div
                      className={`w-16 h-16 border-2 border-black spotty-dot-${dot} spotty-spacing-${sp} ${bgClass}`}
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

/** Shows all opacity levels for a given dot/spacing/color */
export const StorybookSpottyBgOpacity = ({
  color = "#eab308",
  dotSize = "md",
  spacing = "md",
}: Pick<SpottyBgProps, "color" | "dotSize" | "spacing">) => {
  return (
    <div className="flex flex-wrap gap-4 p-6 justify-center">
      {OPACITIES.map((op) => (
        <div key={op} className="flex flex-col items-center gap-2">
          <div
            className={`w-20 h-20 border-4 border-black spotty-dot-${dotSize} spotty-spacing-${spacing} spotty-opacity-${op} spotty-bg-[${color}]`}
          />
          <span className="text-xs font-mono text-gray-500">{op}%</span>
        </div>
      ))}
    </div>
  );
};

/** Shows all three variants side by side */
export const StorybookSpottyBgVariants = ({
  color = "#eab308",
  dotSize = "md",
  spacing = "lg",
  opacity = 30,
}: Omit<SpottyBgProps, "variant">) => {
  const shared = `spotty-dot-${dotSize} spotty-spacing-${spacing} spotty-opacity-${opacity}`;
  return (
    <div className="flex gap-8 p-6 justify-center">
      {(["standard", "diagonal"] as Variant[]).map((v) => {
        const bgClass =
          v === "standard"
            ? `spotty-bg-[${color}]`
            : `spotty-bg-diagonal-[${color}]`;
        return (
          <div key={v} className="flex flex-col items-center gap-2">
            <div className={`w-28 h-28 border-4 border-black ${shared} ${bgClass}`} />
            <span className="text-xs font-mono text-gray-500">{v}</span>
          </div>
        );
      })}
    </div>
  );
};
