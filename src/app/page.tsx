"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Code2, Layers, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/ui/filters";

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 54 33" className={className} fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
    />
  </svg>
);

const SpiderSenseWrapper = dynamic(
  () =>
    import("@/components/ui/spiderSenseWrapper").then((m) => ({
      default: m.SpiderSenseWrapper,
    })),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-amber-300 dark:selection:bg-amber-700">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center px-6 gap-8">
        <Filters.Displacement scale={3} frequency={2}>
          <Button className="bg-card text-foreground dark:text-white w-80 h-32 text-7xl m-32">
            Pow UI
          </Button>
        </Filters.Displacement>

        <div className="mx-auto max-w-2xl bg-card border-4 border-foreground shadow-[-8px_8px_0_0_var(--foreground)] overflow-hidden">
          <div className="spotty-dot-sm spotty-spacing-sm spotty-opacity-25 spotty-bg-accent px-6 py-2 border-b-4 border-foreground">
            <span className="font-[Bangers] text-sm tracking-[0.3em] uppercase">
              The Comic UI Library
            </span>
          </div>
          <div className="p-6">
            <div className="text-2xl md:text-3xl font-bold leading-tight">
              A punchy, comic-inspired UI library for interfaces that{" "}
              <SpiderSenseWrapper containerClassName="inline" trigger="hover">
                <span className="text-orange-400 dark:text-orange-300 underline decoration-foreground underline-offset-4">
                  POP!
                </span>
              </SpiderSenseWrapper>
            </div>
            <p className="mt-4 text-lg text-foreground/70 font-medium">
              Pow UI brings the energy of golden-age comics to your web apps
              with bold borders, expressive shapes, and tactile interactions.
              <br />
              Built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="border-y-4 border-foreground bg-accent text-accent-foreground mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {[
            {
              icon: <TailwindIcon className="size-8" />,
              title: "Made with Tailwind",
              text: "Utility-first styling with no custom CSS to fight. Every style is a class — compose, override, and ship without leaving your markup.",
            },
            {
              icon: <Code2 className="size-8" />,
              title: "Open Source",
              text: "MIT licensed. Free forever. Fork it, own it, and build something worth shouting about. No paywalls, no lock-in.",
            },
            {
              icon: <Layers className="size-8" />,
              title: "Based on shadcn",
              text: "Built on shadcn/ui primitives. Familiar copy-paste setup, zero runtime overhead, comic-book personality baked in.",
            },
            {
              icon: <SlidersHorizontal className="size-8" />,
              title: "Fully Customizable",
              text: "Every component is a starting point, not an endpoint. Override anything with Tailwind classes — no specificity fights.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={[
                "p-10 flex flex-col gap-5 border-foreground",
                i % 2 === 0 ? "md:border-r-4" : "",
                i < 2
                  ? "border-b-4"
                  : i === 2
                    ? "border-b-4 md:border-b-0"
                    : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <div className="size-16 bg-card text-foreground border-4 border-foreground flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-[Bangers] text-3xl tracking-wider">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm font-medium text-accent-foreground/70 leading-relaxed max-w-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section
        className="spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-primary text-primary-foreground
                   border-y-4 border-foreground py-16 px-6 flex flex-col items-center gap-8"
      >
        <Filters.Displacement scale={2} frequency={0.06}>
          <h2 className="font-[Bangers] text-6xl md:text-8xl text-primary-foreground text-center tracking-widest">
            READY TO BUILD?
          </h2>
        </Filters.Displacement>
        <p className="text-primary-foreground/70 text-xl text-center max-w-xl font-medium">
          Explore all 18 components — buttons, shapes, filters, animations,
          toasts, sidebars, and more.
        </p>
        <Button
          size="lg"
          className="text-2xl px-10 h-16 font-[Bangers] tracking-widest bg-accent text-accent-foreground hover:bg-accent"
          asChild
        >
          <Link href="/components">Browse All Components →</Link>
        </Button>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-primary text-primary-foreground
                   border-t-4 border-foreground px-8 pt-16 pb-20 relative"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-4">
            <Filters.Displacement scale={2} frequency={0.06}>
              <Button className="px-6 py-8 font-[Bangers] text-5xl tracking-widest text-foreground bg-card dark:text-white">
                POW UI
              </Button>
            </Filters.Displacement>
            <p className="text-lg font-medium text-primary-foreground max-w-xs">
              Making the web more exciting,
              <br />
              one punch at a time.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="font-[Bangers] text-2xl tracking-wide border-b-4 border-foreground hover:text-amber-700 dark:hover:text-amber-300 transition-colors no-underline w-fit"
            >
              <svg
                className="size-5 inline-block"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a
              href="https://www.chromatic.com/library?appId=68b33f12384a75f2c732fa44"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[Bangers] text-2xl tracking-wide border-b-4 border-foreground hover:text-amber-700 dark:hover:text-amber-300 transition-colors no-underline"
            >
              Storybook
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t-4 border-foreground bg-accent text-accent-foreground px-8 py-4">
          <p className="text-accent-foreground/70 text-sm font-medium text-center">
            Built with React, Next.js, Tailwind CSS, and a whole lot of comic
            energy.
          </p>
        </div>
      </footer>
    </div>
  );
}
