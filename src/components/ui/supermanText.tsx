import { cn } from "@/lib/utils";
import { useMemo, type CSSProperties, type PropsWithChildren } from "react";

type TSupermanTextProps = PropsWithChildren<{
  dx?: number;
  dy?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  borderThickness?: number;
  borderColor?: string;
}>;
export const SupermanText = (props: TSupermanTextProps) => {
  const {
    dx = -5,
    dy = -5,
    color = "black",
    className = "",
    style = {},
    children,
    borderThickness = 0,
    borderColor = "black",
  } = props;

  const textShadow = useMemo(() => {
    const initBorder = borderThickness
      ? `${borderThickness}px ${borderThickness}px ${borderColor},
      ${borderThickness}px ${-borderThickness}px ${borderColor},
      ${-borderThickness}px ${borderThickness}px ${borderColor},
      ${-borderThickness}px ${-borderThickness}px ${borderColor}`
      : "";

    return Array.from(
      Array(2 * (borderThickness + Math.max(Math.abs(dx), Math.abs(dx))))
    ).reduce((acc, _, index, mainArray) => {
      const stepFraction = (index + 1) / mainArray.length;
      const prefix = acc ? ", " : "";
      return `${acc}${prefix}${borderThickness + stepFraction * dx}px ${
        borderThickness + stepFraction * dy
      }px ${color}`;
    }, initBorder);
  }, [dx, dy, color]);

  console.log(textShadow);

  return (
    <div className={cn(className)} style={{ textShadow, ...style }}>
      {children}
    </div>
  );
};
