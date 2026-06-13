"use client";

import { useMemo } from "react";
import { COMPONENT_DEMOS, type DemoGroup } from "./demos";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarPanel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { ComponentDemo } from "./demos";
import { Filters } from "@/components/ui/filters";
import { InstallCommands } from "./InstallCommands";

const GROUPS: DemoGroup[] = [
  "Primitives",
  "Layout",
  "Visual Effects",
  "Filters",
  "Feedback",
  "Backgrounds",
];

// ─── Demo Panel ───────────────────────────────────────────────────────────────

function DemoPanel({ demo }: { demo: ComponentDemo }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div
        className="bg-accent text-primary-foreground
                      px-4 pt-6 pb-4 md:px-8 md:pt-8 md:pb-6 border-b-4 border-foreground"
      >
        <Filters.Displacement scale={1.5} frequency={0.05}>
          <h1 className="font-[Bangers] text-3xl md:text-5xl tracking-widest">
            {demo.label}
          </h1>
        </Filters.Displacement>
        <p className="mt-2 font-medium text-primary-foreground/70 text-base md:text-lg max-w-2xl">
          {demo.description}
        </p>
      </div>

      {/* Demo Area */}
      <div className="flex-1 min-h-fit p-4 gap-6 md:p-8 md:gap-8 flex flex-col">
        <div className="hatched-bg-primary hatched-opacity-20 text-primary-foreground border-4 border-foreground p-4 md:p-12 flex items-start justify-center min-h-fit">
          <Filters.Displacement
            scale={1.5}
            frequency={0.05}
            containerClassName="w-full flex items-center justify-center"
          >
            <div
              className="bg-card text-card-foreground border-4 border-foreground shadow-[-4px_4px_0_0_var(--foreground)] md:shadow-[-8px_8px_0_0_var(--foreground)]
                         p-4 md:p-8 w-fit max-w-full"
            >
              {demo.demo}
            </div>
          </Filters.Displacement>
        </div>

        <InstallCommands name={demo.registryName ?? demo.id} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentsPage() {
  const initialId = useMemo(() => {
    if (typeof window === "undefined") return COMPONENT_DEMOS[0].id;
    const hash = window.location.hash.slice(1);
    return (
      COMPONENT_DEMOS.find((d) => d.id === hash)?.id ?? COMPONENT_DEMOS[0].id
    );
  }, []);

  return (
    <SidebarProvider
      defaultValue={initialId}
      onValueChange={(v) => {
        if (typeof window !== "undefined") {
          history.replaceState(null, "", `#${v}`);
        }
      }}
      className="flex-grow-1 min-h-0 bg-transparent overflow-hidden"
    >
      <Filters.Displacement scale={2} className="size-full overflow-auto">
        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <Sidebar
          collapsible="offcanvas"
          className="border-r-4 border-foreground"
        >
          <SidebarContent className="bg-card">
            {GROUPS.map((group) => (
              <SidebarGroup key={group}>
                <SidebarGroupLabel className="font-[Bangers] text-base tracking-widest uppercase px-3 py-2">
                  {group}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {COMPONENT_DEMOS.filter((d) => d.group === group).map(
                      (demo) => (
                        <SidebarMenuItem key={demo.id}>
                          <SidebarMenuButton
                            value={demo.id}
                            className="font-[Walter_Turncoat] font-bold spotty-bg-primary text-base"
                          >
                            <span>{demo.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ),
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
      </Filters.Displacement>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <SidebarInset className="bg-transparent">
        {/* Mobile top bar */}
        <div
          className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3
                     border-b-4 border-foreground bg-primary text-primary-foreground
                     spotty-dot-xs spotty-spacing-xs spotty-opacity-20 spotty-bg-primary
                     md:hidden"
        >
          <SidebarTrigger />
          <span className="font-[Bangers] text-xl tracking-wide">
            Components
          </span>
        </div>

        {/* Demo panels — only the active one renders (SidebarPanel handles this) */}
        {COMPONENT_DEMOS.map((demo) => (
          <SidebarPanel key={demo.id} value={demo.id} className="size-full">
            <DemoPanel demo={demo} />
          </SidebarPanel>
        ))}
      </SidebarInset>
    </SidebarProvider>
  );
}
