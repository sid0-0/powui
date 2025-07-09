import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  containerClassName,
  labelClassName,
  label,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  label?: React.ReactNode;
}) {
  const { checked } = props;
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        containerClassName,
        "filter-[url(#displacementFilter)]"
      )}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className,
          "filter-[url(#displacementFilter)]"
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none relative"
        >
          <CheckIcon className="size-8 absolute -translate-y-1" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <span className={cn(labelClassName, "ml-2", checked && "line-through")}>
          {label}
        </span>
      )}
    </div>
  );
}

export { Checkbox };
