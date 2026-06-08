"use client";

import { Filters } from "@/components/ui/filters";

export function GlobalBackground() {
  return (
    <Filters.Displacement
      scale={3}
      frequency={0.2}
      containerClassName="fixed inset-0 pointer-events-none"
      className="size-full"
    >
      <div className="spotty-dot-lg spotty-spacing-xl spotty-bg-primary size-full" />
    </Filters.Displacement>
  );
}
