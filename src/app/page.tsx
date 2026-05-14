"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudWrapper } from "@/components/ui/cloud";
import { Filters } from "@/components/ui/filters";
import { Tooltip } from "@/components/ui/tooltip";
import { comicToast } from "@/components/ui/sonner";

const BurstWrapper = dynamic(
  () =>
    import("@/components/ui/burst").then((m) => ({ default: m.BurstWrapper })),
  { ssr: false },
);
const SpiderSenseWrapper = dynamic(
  () =>
    import("@/components/ui/spiderSenseWrapper").then((m) => ({
      default: m.SpiderSenseWrapper,
    })),
  { ssr: false },
);

// ─── Comic Panel ─────────────────────────────────────────────────────────────

const ComicPanel = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-4 border-black bg-white relative flex flex-col min-h-[420px]">
    <span className="absolute top-3 left-4 font-[Bangers] text-7xl text-black opacity-5 select-none leading-none">
      {String(number).padStart(2, "0")}
    </span>
    <div className="px-6 py-4 border-b-4 border-black spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-[#eab308]">
      <h3 className="font-[Bangers] text-2xl tracking-widest uppercase">
        {title}
      </h3>
    </div>
    <div className="flex-1 flex items-center justify-center p-8">
      {children}
    </div>
  </div>
);

// ─── Filter Demo Card ─────────────────────────────────────────────────────────

const FilterCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-4 border-white flex flex-col overflow-hidden">
    <div className="px-4 py-2 border-b-4 border-white">
      <span className="font-[Bangers] text-xl tracking-widest text-[#eab308] uppercase">
        {title}
      </span>
    </div>
    <div className="flex-1 flex items-center justify-center p-8 min-h-[200px]">
      {children}
    </div>
  </div>
);

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [sliderValue, setSliderValue] = useState([75]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    comic: true,
    bold: false,
    tactile: true,
  });

  return (
    <div className="relative min-h-screen selection:bg-amber-300">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center px-6 gap-8">
        {/* Original-style Pow UI button banner */}
        <Filters.Displacement scale={3} frequency={2}>
          <Button className="bg-white w-80 h-32 text-7xl m-32">Pow UI</Button>
        </Filters.Displacement>

        {/* Tagline card */}
        <div className="mx-auto max-w-2xl bg-white border-4 border-black shadow-[-8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
          <div className="spotty-dot-sm spotty-spacing-sm spotty-opacity-25 spotty-bg-[#eab308] px-6 py-2 border-b-4 border-black">
            <span className="font-[Bangers] text-sm tracking-[0.3em] uppercase">
              The Comic UI Library
            </span>
          </div>
          <div className="p-6">
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              A punchy, comic-inspired UI library for interfaces that{" "}
              <SpiderSenseWrapper containerClassName="inline" trigger="hover">
                <span className="text-orange-400 underline decoration-black underline-offset-4">
                  POP!
                </span>
              </SpiderSenseWrapper>
            </p>
            <p className="mt-4 text-lg text-gray-700 font-medium">
              Pow UI brings the energy of golden-age comics to your web apps
              with bold borders, expressive shapes, and tactile interactions.
              <br />
              Built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three Comic Panels ──────────────────────────────────────────── */}
      <section className="mt-52 border-y-4 border-black">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Panel 1 — Buttons */}
          <ComicPanel number={1} title="Buttons">
            <div className="flex flex-col gap-4 w-full items-center">
              <div className="flex flex-wrap gap-3 justify-center">
                <Button>Default</Button>
                <Button variant="destructive">Danger!</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex gap-3 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </ComicPanel>

          {/* Panel 2 — Shapes */}
          <ComicPanel number={2} title="Shapes">
            <div className="flex flex-col gap-8 items-center justify-center">
              <div className="bg-amber-400 border-4 border-black px-10 py-5 text-center font-black text-3xl italic uppercase shadow-[-5px_5px_0_black]">
                BAM!
              </div>
              <CloudWrapper heightVariance={15} flatteryFactor={1.5}>
                <div className="bg-white px-8 py-4 border-4 border-black text-center font-bold text-xl">
                  I&apos;m a cloud!
                </div>
              </CloudWrapper>
            </div>
          </ComicPanel>

          {/* Panel 3 — Controls */}
          <ComicPanel number={3} title="Controls">
            <div className="flex flex-col gap-6 w-full max-w-xs">
              <div className="flex flex-col gap-3">
                {[
                  { id: "comic", label: "Comic styling" },
                  { id: "bold", label: "Bold borders" },
                  { id: "tactile", label: "Tactile feedback" },
                ].map((item) => (
                  <Checkbox
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    className="size-6"
                    labelClassName="text-base font-bold"
                    checked={checkedItems[item.id]}
                    onCheckedChange={(v) =>
                      setCheckedItems((prev) => ({
                        ...prev,
                        [item.id]: Boolean(v),
                      }))
                    }
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-base">Power Level</label>
                  <span className="font-[Bangers] text-2xl text-amber-600">
                    {sliderValue[0]}
                  </span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  thickness={20}
                />
              </div>
            </div>
          </ComicPanel>
        </div>
      </section>

      {/* ── Filter Showcase ─────────────────────────────────────────────── */}
      <section className="bg-black border-b-4 border-white py-16 px-6">
        <h2 className="font-[Bangers] text-5xl md:text-6xl text-[#eab308] text-center mb-3 tracking-widest">
          SVG FILTER EFFECTS
        </h2>
        <p className="text-center text-white/60 mb-10 text-lg font-medium">
          Same content. Three different filters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto border-4 border-white">
          <FilterCard title="Displacement">
            <Filters.Displacement scale={10} frequency={0.4}>
              <div className="bg-[#eab308] border-4 border-black px-8 py-4 text-center">
                <span className="font-[Bangers] text-5xl tracking-widest text-black">
                  POW UI
                </span>
              </div>
            </Filters.Displacement>
          </FilterCard>
          <FilterCard title="Chroma Aberr.">
            <Filters.ChromaAberr offset={6}>
              <div className="bg-[#eab308] border-4 border-black px-8 py-4 text-center">
                <span className="font-[Bangers] text-5xl tracking-widest text-black">
                  POW UI
                </span>
              </div>
            </Filters.ChromaAberr>
          </FilterCard>
          <FilterCard title="Posterize">
            <Filters.Posterize buckets={2}>
              <div className="bg-[#eab308] border-4 border-black px-8 py-4 text-center">
                <span className="font-[Bangers] text-5xl tracking-widest text-black">
                  POW UI
                </span>
              </div>
            </Filters.Posterize>
          </FilterCard>
        </div>
      </section>

      {/* ── Component Preview Tabs ──────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Filters.Displacement scale={2} frequency={0.06}>
            <h2 className="font-[Bangers] text-5xl text-center mb-3 tracking-widest">
              COMPONENT PREVIEW
            </h2>
          </Filters.Displacement>
          <p className="text-center text-gray-700 font-bold mb-10 text-lg">
            A taste of what&apos;s in the library.
          </p>

          <Tabs defaultValue="primitives" tabsPlacement="top">
            <TabsList className="w-full">
              <TabsTrigger
                value="primitives"
                className="font-[Bangers] tracking-wider text-lg flex-1"
              >
                Primitives
              </TabsTrigger>
              <TabsTrigger
                value="wrappers"
                className="font-[Bangers] tracking-wider text-lg flex-1"
              >
                Wrappers
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="font-[Bangers] tracking-wider text-lg flex-1"
              >
                Feedback
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="primitives"
              className="border-4 border-t-0 border-black bg-white p-8"
            >
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="font-[Bangers] text-2xl mb-4 tracking-wide">
                    Avatars
                  </h4>
                  <div className="flex gap-6 items-center flex-wrap">
                    <Avatar className="size-16">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-16 border-amber-500">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                      <AvatarFallback>FL</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-16 border-red-500">
                      <AvatarFallback className="font-[Bangers] text-2xl">
                        POW
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div>
                  <h4 className="font-[Bangers] text-2xl mb-4 tracking-wide">
                    Tooltips
                  </h4>
                  <div className="flex gap-6 items-center flex-wrap">
                    <Tooltip
                      triggerContent={
                        <Button variant="secondary">Hover me (top)</Button>
                      }
                      content="ZAP! That's a tooltip."
                      side="top"
                      type="normal"
                    />
                    <Tooltip
                      triggerContent={
                        <Button variant="secondary">Hover me (bubbles)</Button>
                      }
                      content="POW! Bubble tooltip!"
                      side="top"
                      type="bubbles"
                      bubblePath="arc"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="wrappers"
              className="border-4 border-t-0 border-black bg-white p-8"
            >
              <div className="flex flex-wrap gap-12 items-center justify-center">
                <BurstWrapper
                  borders={[
                    { color: "black", scale: 1.1 },
                    { color: "#eab308", scale: 1.18 },
                  ]}
                  heightVariance={22}
                >
                  <div className="bg-white px-10 py-6 text-center font-black text-2xl italic uppercase border-4 border-black">
                    WHAM!
                  </div>
                </BurstWrapper>
                <CloudWrapper heightVariance={20} flatteryFactor={1.3}>
                  <div className="bg-white border-4 border-black px-10 py-6 text-center font-bold text-xl min-w-[200px]">
                    Floating thoughts...
                  </div>
                </CloudWrapper>
              </div>
            </TabsContent>

            <TabsContent
              value="feedback"
              className="border-4 border-t-0 border-black bg-white p-8"
            >
              <div className="flex flex-col gap-6 items-center">
                <p className="font-bold text-lg text-gray-700 text-center">
                  Click a button to fire a comic toast notification!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    onClick={() =>
                      comicToast.default(
                        "HEY! Something happened.",
                        "Here's the scoop.",
                      )
                    }
                  >
                    Default Toast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      comicToast.success(
                        "POW! Mission complete!",
                        "Everything worked out great.",
                      )
                    }
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      comicToast.error(
                        "ZAP! Something broke!",
                        "Check the console, hero.",
                      )
                    }
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      comicToast.warning(
                        "UH-OH! Watch out!",
                        "Proceed with caution.",
                      )
                    }
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      comicToast.info(
                        "HMM... Good to know.",
                        "Just some info for you.",
                      )
                    }
                  >
                    Info Toast
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section
        className="spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-[#eab308]
                          border-y-4 border-black py-16 px-6 flex flex-col items-center gap-8"
      >
        <Filters.Displacement scale={2} frequency={0.06}>
          <h2 className="font-[Bangers] text-6xl md:text-8xl text-black text-center tracking-widest">
            READY TO BUILD?
          </h2>
        </Filters.Displacement>
        <p className="text-black/70 text-xl text-center max-w-xl font-medium">
          Explore all 18 components — buttons, shapes, filters, animations,
          toasts, sidebars, and more.
        </p>
        <Button
          size="lg"
          className="text-2xl px-10 h-16 font-[Bangers] tracking-widest"
          asChild
        >
          <Link href="/components">Browse All Components →</Link>
        </Button>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-[#eab308]
                         border-t-4 border-black px-8 py-16"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-4">
            <Filters.Displacement scale={2} frequency={0.06}>
              <div className="border-4 border-black px-6 py-2 bg-white shadow-[-4px_4px_0_black] inline-block">
                <span className="font-[Bangers] text-5xl tracking-widest text-black">
                  POW UI
                </span>
              </div>
            </Filters.Displacement>
            <p className="text-lg font-medium text-gray-800 max-w-xs">
              Making the web more exciting,
              <br />
              one punch at a time.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/sid0-0/powui"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[Bangers] text-2xl tracking-wide border-b-4 border-black hover:text-amber-700 transition-colors no-underline"
            >
              GitHub ↗
            </a>
            <Link
              href="/components"
              className="font-[Bangers] text-2xl tracking-wide border-b-4 border-black hover:text-amber-700 transition-colors no-underline"
            >
              Components ↗
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-12 pt-6 border-t-4 border-black">
          <p className="text-gray-600 text-sm font-medium">
            Built with React, Next.js, Tailwind CSS, and a whole lot of comic
            energy.
          </p>
        </div>
      </footer>
    </div>
  );
}
