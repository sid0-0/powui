import { Button } from "@/components/ui/button";
export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** How large should the button be? */
  size?: "default" | "sm" | "lg" | "icon";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const StorybookButton = ({
  primary = false,
  size = "default",
  label,
  ...props
}: ButtonProps) => {
return <Button size={size} className="">{label.toUpperCase()}</Button>;
};
