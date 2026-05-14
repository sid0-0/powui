"use client";

import Link from "next/link";
import { useMemo } from "react";
import { COMPONENT_DEMOS, type DemoGroup } from "./demos";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarPanel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { ComponentDemo } from "./demos";
import { Filters } from "@/components/ui/filters";

const GROUPS: DemoGroup[] = [
  "Primitives",
  "Layout",
  "Visual Effects",
  "Feedback",
];

// ─── Demo Panel ───────────────────────────────────────────────────────────────

function DemoPanel({ demo }: { demo: ComponentDemo }) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className="spotty-dot-sm spotty-spacing-sm spotty-opacity-25 spotty-bg-[#eab308]
                      px-8 pt-8 pb-6 border-b-4 border-black"
      >
        <Filters.Displacement scale={1.5} frequency={0.05}>
          <h1 className="font-[Bangers] text-5xl tracking-widest">
            {demo.label}
          </h1>
        </Filters.Displacement>
        <p className="mt-2 font-medium text-gray-600 text-lg max-w-2xl">
          {demo.description}
        </p>
      </div>

      {/* Demo Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div
          className="spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-[#eab308]
                     border-4 border-black p-8 md:p-12
                     flex items-start justify-center min-h-[300px]"
        >
          <Filters.Displacement
            scale={1.5}
            frequency={0.05}
            className="w-full max-w-2xl"
          >
            <div
              className="bg-white border-4 border-black shadow-[-8px_8px_0_0_rgba(0,0,0,1)]
                         p-8 w-full"
            >
              {demo.demo}
            </div>
          </Filters.Displacement>
        </div>
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
      className="min-h-[calc(100vh-3.5rem)] bg-transparent"
    >
      <Filters.Displacement>
        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <Sidebar collapsible="offcanvas" className="border-r-4 border-black">
          {/* Back link */}
          <SidebarHeader className="p-0">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-3 border-b-4 border-black
                       spotty-dot-sm spotty-spacing-sm spotty-opacity-30 spotty-bg-[#eab308]
                       font-[Bangers] text-xl tracking-wide text-black no-underline
                       hover:opacity-80 transition-opacity"
            >
              ← POW UI
            </Link>
          </SidebarHeader>

          <SidebarContent className="bg-white">
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
                            className="font-[Walter_Turncoat] font-bold text-base"
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
                     border-b-4 border-black bg-[#eab308]
                     spotty-dot-xs spotty-spacing-xs spotty-opacity-20 spotty-bg-[#eab308]
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
