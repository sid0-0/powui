import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface StorybookSkeletonProps {
  /** Fire a comic radial-lines burst when each skeleton unmounts */
  burst?: boolean;
}

export const StorybookSkeleton = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex w-[420px] flex-col gap-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-[Bangers] text-xl tracking-wide">Loading State</h4>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setLoading((v) => !v)}
        >
          {loading ? "Reveal Content" : "Show Skeleton"}
        </Button>
      </div>
      {loading ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-in fade-in-0 duration-300">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="font-[Bangers] text-xl">Pow UI Hero</p>
              <p className="font-bold text-muted-foreground">@powui</p>
            </div>
          </div>
          <p className="font-[Walter_Turncoat] font-bold text-lg">
            Making the web more exciting, one punch at a time! Built with React,
            Tailwind, and pure comic energy.
          </p>
          <div className="border-4 border-foreground rounded-xl spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-primary text-primary-foreground h-32 flex items-center justify-center">
            <span className="font-[Bangers] text-3xl tracking-widest">
              Content loaded!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
