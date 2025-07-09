import { Button } from "@/components/ui/button";
export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** How large should the button be? */
  size?: "default" | "sm" | "lg" | "icon";
  /** Button contents */
  label: React.ReactNode;
  /** Optional click handler */
  onClick?: () => void;
  className?: string;
}

/** Primary UI component for user interaction */
export const StorybookButton = ({
  primary = false,
  size = "default",
  label,
  ...props
}: ButtonProps) => {
  const toRender = typeof label === "string" ? label.toUpperCase() : label;
  return (
    <Button size={size} {...props}>
      {toRender}
    </Button>
  );
};
