"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import cx from "classnames";

const ButtonState = {
  Rest: "rest",
  Pressed: "pressed",
  Raised: "raised",
} as const;

type ButtonStateType = (typeof ButtonState)[keyof typeof ButtonState];

const buttonVariants = cva(
  cx(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "border-3 border-solid border-black text-black shadow-[-6px_6px_0_black] py-2 px-4",
    "transition-[translate,box-shadow] duration-[150ms] ease-[cubic-bezier(.67,1.5,.95,1.24)]",
    "font-[Walter_Turncoat]",
  ),
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-destructive hover:bg-destructive/90 dark:bg-destructive/60",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
  }) {
  const Comp = asChild ? Slot : "button";

  const elem = React.useRef<HTMLButtonElement>(null);

  const buttonStateToggle = (
    state: ButtonStateType,
    elem: HTMLButtonElement,
  ) => {
    if (!elem) return;
    if (state === ButtonState.Pressed) {
      elem.style.setProperty("translate", "-4px 4px");
      elem.style.setProperty("box-shadow", "-2px 2px");
    } else if (state === ButtonState.Raised) {
      elem.style.setProperty("translate", "4px -4px");
      elem.style.setProperty("box-shadow", "-8px 8px");
    } else {
      elem.style.removeProperty("translate");
      elem.style.removeProperty("box-shadow");
    }
  };

  const loadRef = (node: HTMLButtonElement) => {
    if (!node) return;
    elem.current = node;
    elem.current.addEventListener("mousedown", () => {
      buttonStateToggle(ButtonState.Pressed, node);
    });
    elem.current.addEventListener("mouseup", () => {
      buttonStateToggle(ButtonState.Raised, node);
    });
    elem.current.addEventListener("mouseleave", () => {
      buttonStateToggle(ButtonState.Rest, node);
    });
    elem.current.addEventListener("mouseenter", () => {
      buttonStateToggle(ButtonState.Raised, node);
    });
    if (ref && typeof ref === "function") {
      ref(node);
    } else if (ref && typeof ref === "object") {
      ref.current = node;
    }
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={loadRef}
      {...props}
    />
  );
}

export { Button, buttonVariants };
