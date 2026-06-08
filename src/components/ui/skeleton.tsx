"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md",
        "after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.45)_50%,transparent_60%)]",
        "after:animate-[pow-skeleton-sweep_2.2s_cubic-bezier(.67,1.5,.95,1.24)_infinite]",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)",
        backgroundSize: "8px 8px",
        animation: "pow-skeleton 2.2s cubic-bezier(.67,1.5,.95,1.24) infinite",
        ...style,
      }}
      {...props}
    />
  );
}

export { Skeleton };
