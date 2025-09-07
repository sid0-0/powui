import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  floating = false,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  floating?: boolean;
}) {
  if (floating) {
    return (
      <div
        className={cn(
          "relative flex flex-col shrink-0 rounded-full",
          "border-4 border-solid border-black",
          "filter-[url(#displacementFilter)]",
          "shadow-[-6px_6px_0_rgba(0,0,0)]",
          className
        )}
      >
        <AvatarPrimitive.Root
          data-slot="avatar"
          className={cn(
            "flex !height-1/2 shrink-0 rounded-full",
            className
          )}
          {...props}
        />
        <AvatarPrimitive.Root
          data-slot="avatar"
          className={cn(
            "flex !height-1/2 shrink-0 overflow-hidden rounded-full",
            className
          )}
          {...props}
        />
      </div>
    );
  }
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        "border-4 border-solid border-black",
        "filter-[url(#displacementFilter)]",
        "shadow-[-6px_6px_0_rgba(0,0,0)]",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("object-cover size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center text-center",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
