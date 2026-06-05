import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  style,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base outline-none md:text-sm",
        "border-3 border-solid border-foreground text-foreground shadow-[-3px_3px_0_var(--foreground)]",
        "transition-[translate,box-shadow,border-color] duration-[150ms] ease-[cubic-bezier(.67,1.5,.95,1.24)]",
        "focus-visible:translate-x-[1px] focus-visible:translate-y-[-1px] focus-visible:shadow-[-4px_4px_0_var(--foreground)]",
        "aria-invalid:border-destructive aria-invalid:shadow-[-3px_3px_0_var(--destructive)]",
        "aria-invalid:focus-visible:shadow-[-4px_4px_0_var(--destructive)]",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.18) 0.7px, transparent 0.7px)",
        backgroundSize: "5px 5px",
        backgroundColor: "var(--accent)",
        ...style,
      }}
      {...props}
    />
  )
}

export { Input }
