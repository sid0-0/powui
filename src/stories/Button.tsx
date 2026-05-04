import { Button } from "@/components/ui/button";
import { Filters } from "@/components/ui/filters";

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
    <Filters.Displacement>
      <Button
        size={size}
        className="spotty-bg-[#eab308] hover:spotty-bg-[#ca8a04]"
        {...props}
      >
        {toRender}
      </Button>
    </Filters.Displacement>
  );
};
