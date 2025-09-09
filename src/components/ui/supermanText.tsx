import { cn } from "@/lib/utils";
import { useMemo, type CSSProperties, type PropsWithChildren } from "react";

type TSupermanTextProps = PropsWithChildren<{
  dx?: number;
  dy?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}>;
export const SupermanText = (props: TSupermanTextProps) => {
  const {
    dx = -5,
    dy = -5,
    color = "black",
    className = "",
    style = {},
    children,
  } = props;

  const textShadow = useMemo(
    () =>
      Array.from(Array(2 * Math.max(Math.abs(dx), Math.abs(dx)))).reduce(
        (acc, _, index, mainArray) => {
          const stepFraction = (index + 1) / mainArray.length;
          const prefix = index === 0 ? "" : ", ";
          return `${acc}${prefix}${stepFraction * dx}px ${
            stepFraction * dy
          }px ${color}`;
        },
        ""
      ),
    [dx, dy, color]
  );

  return (
    <div className={cn(className)} style={{ textShadow, ...style }}>
      {children}
    </div>
  );
};
