"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/ui/filters";

const REGISTRY_BASE = "https://powui.dev/r";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

function buildCommand(pm: PackageManager, url: string) {
  switch (pm) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${url}`;
    case "npm":
      return `npx shadcn@latest add ${url}`;
    case "yarn":
      return `yarn dlx shadcn@latest add ${url}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${url}`;
  }
}

function CommandRow({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — clipboard may be unavailable in some browsers
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 md:p-4 bg-card">
      <code className="flex-1 font-mono text-xs md:text-sm text-foreground overflow-x-auto whitespace-nowrap no-scrollbar select-all">
        {command}
      </code>
      <Button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className={cn(
          "shrink-0 inline-flex items-center justify-center size-9",
          "bg-background text-foreground",
        )}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}

export function InstallCommands({ name }: { name: string }) {
  const url = `${REGISTRY_BASE}/${name}.json`;

  return (
    <div className="hatched-bg-primary hatched-thickness-sm hatched-spacing-md hatched-opacity-20 border-4 border-foreground p-6 md:p-8 flex flex-col gap-4">
      <h3 className="font-[Bangers] text-2xl md:text-3xl tracking-widest text-foreground">
        Install
      </h3>

      <Filters.Displacement scale={1.3} frequency={0.05}>
        <Tabs defaultValue="pnpm" tabsPlacement="top" tabHeight="2rem">
          <TabsList>
            {PACKAGE_MANAGERS.map((pm) => (
              <TabsTrigger
                key={pm}
                value={pm}
                className="font-[Bangers] tracking-wider uppercase"
              >
                {pm}
              </TabsTrigger>
            ))}
          </TabsList>
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsContent key={pm} value={pm} className="bg-card">
              <CommandRow command={buildCommand(pm, url)} />
            </TabsContent>
          ))}
        </Tabs>
      </Filters.Displacement>

      <p className="text-sm md:text-base font-bold text-foreground font-[Walter_Turncoat]">
        Drops the component (and its deps) right into your project — works with
        any shadcn-compatible setup.
      </p>
    </div>
  );
}
