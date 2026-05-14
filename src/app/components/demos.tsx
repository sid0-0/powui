"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CloudWrapper } from "@/components/ui/cloud";
import { Filters } from "@/components/ui/filters";
import { Tooltip } from "@/components/ui/tooltip";
import { comicToast } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";

const BurstWrapper = dynamic(
  () => import("@/components/ui/burst").then((m) => ({ default: m.BurstWrapper })),
  { ssr: false }
);
const SpiderSenseWrapper = dynamic(
  () =>
    import("@/components/ui/spiderSenseWrapper").then((m) => ({
      default: m.SpiderSenseWrapper,
    })),
  { ssr: false }
);
import { useEventOnomatopoeia } from "@/components/ui/onomatopoeia";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DemoGroup = "Primitives" | "Layout" | "Visual Effects" | "Feedback";

export type ComponentDemo = {
  id: string;
  label: string;
  group: DemoGroup;
  description: string;
  demo: React.ReactNode;
};

// ─── Individual Demo Components ───────────────────────────────────────────────

function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Variants</h4>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Sizes</h4>
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">With Filter</h4>
        <Filters.Displacement scale={4} frequency={0.25}>
          <Button className="spotty-dot-sm spotty-spacing-sm spotty-bg-[#eab308] w-full h-12 text-lg font-[Bangers] tracking-widest">
            DISPLACEMENT BUTTON
          </Button>
        </Filters.Displacement>
      </div>
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Disabled</h4>
        <div className="flex gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Sizes</h4>
        <div className="flex gap-6 items-end flex-wrap">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar className="size-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar className="size-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Border Colors</h4>
        <div className="flex gap-6 items-center flex-wrap">
          <Avatar className="size-16">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar className="size-16 border-amber-500">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" />
            <AvatarFallback>BO</AvatarFallback>
          </Avatar>
          <Avatar className="size-16 border-red-500">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carol" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <Avatar className="size-16 border-blue-500">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dave" />
            <AvatarFallback>DA</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Fallback</h4>
        <div className="flex gap-4 items-center">
          <Avatar className="size-16">
            <AvatarFallback>POW</AvatarFallback>
          </Avatar>
          <Avatar className="size-16 border-amber-500">
            <AvatarFallback className="font-[Bangers] text-2xl">!</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

function CheckboxDemo() {
  const [items, setItems] = useState({
    a: true,
    b: false,
    c: true,
    d: false,
  });
  const toggle = (key: keyof typeof items) =>
    setItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const list = [
    { key: "a", label: "Comic borders on everything" },
    { key: "b", label: "Spotty dot backgrounds" },
    { key: "c", label: "Tactile press feedback" },
    { key: "d", label: "Walter Turncoat font" },
  ] as const;

  return (
    <div className="flex flex-col gap-4 w-full bg-amber-800">
      <h4 className="font-[Bangers] text-xl tracking-wide mb-1">Interactive List</h4>
      {list.map(({ key, label }) => (
        <Checkbox
          key={key}
          id={`check-${key}`}
          label={label}
          className="size-6"
          labelClassName="text-base font-bold"
          checked={items[key]}
          onCheckedChange={() => toggle(key)}
        />
      ))}
      <p className="text-sm text-gray-500 font-bold mt-2">
        {Object.values(items).filter(Boolean).length} of {list.length} checked
      </p>
    </div>
  );
}

function SliderDemo() {
  const [circVal, setCircVal] = useState([60]);
  const [rectVal, setRectVal] = useState([40]);
  const [thickVal, setThickVal] = useState([75]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-[Bangers] text-xl tracking-wide">Circular Thumb</h4>
          <span className="font-[Bangers] text-2xl text-amber-600">{circVal[0]}</span>
        </div>
        <Slider
          shape="circular"
          value={circVal}
          onValueChange={setCircVal}
          max={100}
          step={1}
          thickness={20}
        />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-[Bangers] text-xl tracking-wide">Rectangular Thumb</h4>
          <span className="font-[Bangers] text-2xl text-amber-600">{rectVal[0]}</span>
        </div>
        <Slider
          shape="rectangular"
          value={rectVal}
          onValueChange={setRectVal}
          max={100}
          step={1}
          thickness={20}
        />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-[Bangers] text-xl tracking-wide">Thick Track</h4>
          <span className="font-[Bangers] text-2xl text-amber-600">{thickVal[0]}</span>
        </div>
        <Slider
          value={thickVal}
          onValueChange={setThickVal}
          max={100}
          step={1}
          thickness={32}
        />
      </div>
    </div>
  );
}


function TabsDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Top Placement</h4>
        <Tabs defaultValue="one" tabsPlacement="top">
          <TabsList>
            <TabsTrigger value="one">Panel One</TabsTrigger>
            <TabsTrigger value="two">Panel Two</TabsTrigger>
            <TabsTrigger value="three">Panel Three</TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="border-4 border-t-0 border-black p-4 bg-white">
            <p className="font-bold">Content for Panel One — POW!</p>
          </TabsContent>
          <TabsContent value="two" className="border-4 border-t-0 border-black p-4 bg-white">
            <p className="font-bold">Content for Panel Two — ZAP!</p>
          </TabsContent>
          <TabsContent value="three" className="border-4 border-t-0 border-black p-4 bg-white">
            <p className="font-bold">Content for Panel Three — BAM!</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-3">Left Placement</h4>
        <Tabs defaultValue="x" tabsPlacement="left" tabWidth="100px">
          <TabsList>
            <TabsTrigger value="x">Alpha</TabsTrigger>
            <TabsTrigger value="y">Beta</TabsTrigger>
          </TabsList>
          <TabsContent value="x" className="border-4 border-l-0 border-black p-4 bg-white flex-1">
            <p className="font-bold">Alpha content — KAPOW!</p>
          </TabsContent>
          <TabsContent value="y" className="border-4 border-l-0 border-black p-4 bg-white flex-1">
            <p className="font-bold">Beta content — WHAM!</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function SheetDemo() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h4 className="font-[Bangers] text-xl tracking-wide mb-2">Open from any side</h4>
      <div className="flex flex-wrap gap-3 justify-center">
        {(["right", "left", "top", "bottom"] as const).map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline" className="capitalize">
                Open {side}
              </Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle className="font-[Bangers] text-3xl tracking-wide">
                  POW! Sheet
                </SheetTitle>
                <SheetDescription className="font-[Walter_Turncoat] font-bold">
                  Sliding in from the {side}. Pretty slick, right?
                </SheetDescription>
              </SheetHeader>
              <div className="p-6 flex flex-col gap-4">
                <p className="font-bold">This is a Sheet component sliding in from the {side}.</p>
                <Button variant="secondary">Do something heroic</Button>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}

function BurstDemo() {
  const [variance, setVariance] = useState([20]);
  const [separation, setSeparation] = useState([30]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-center min-h-[200px] items-center">
        <BurstWrapper
          heightVariance={variance[0]}
          peakSeparation={separation[0]}
          borders={[{ color: "black", scale: 1.08 }, { color: "#eab308", scale: 1.16 }]}
          curvedDips={false}
        >
          <div className="bg-white border-4 border-black px-10 py-6 text-center font-black text-2xl italic uppercase">
            POW!
          </div>
        </BurstWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <label className="font-bold">Height Variance</label>
          <span className="font-[Bangers] text-xl text-amber-600">{variance[0]}</span>
        </div>
        <Slider value={variance} onValueChange={setVariance} min={5} max={50} step={1} thickness={16} />
        <div className="flex justify-between">
          <label className="font-bold">Peak Separation</label>
          <span className="font-[Bangers] text-xl text-amber-600">{separation[0]}</span>
        </div>
        <Slider value={separation} onValueChange={setSeparation} min={10} max={80} step={1} thickness={16} />
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        <BurstWrapper huggingStyle="elliptical" borders={[{ color: "black", scale: 1.1 }]}>
          <div className="bg-amber-400 px-6 py-3 font-black text-xl">Elliptical</div>
        </BurstWrapper>
        <BurstWrapper huggingStyle="rectangular" borders={[{ color: "black", scale: 1.1 }]}>
          <div className="bg-amber-400 px-6 py-3 font-black text-xl">Rectangular</div>
        </BurstWrapper>
      </div>
    </div>
  );
}

function CloudDemo() {
  const [variance, setVariance] = useState([15]);
  const [flattery, setFlattery] = useState([1.5]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-center min-h-[160px] items-center">
        <CloudWrapper
          heightVariance={variance[0]}
          flatteryFactor={flattery[0]}
          huggingStyle="rectangular"
        >
          <div className="bg-white border-4 border-black px-10 py-6 text-center font-bold text-xl min-w-[220px]">
            I&apos;m floating on a cloud!
          </div>
        </CloudWrapper>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <label className="font-bold">Height Variance</label>
          <span className="font-[Bangers] text-xl text-amber-600">{variance[0]}</span>
        </div>
        <Slider value={variance} onValueChange={setVariance} min={5} max={40} step={1} thickness={16} />
        <div className="flex justify-between">
          <label className="font-bold">Flattery Factor</label>
          <span className="font-[Bangers] text-xl text-amber-600">{flattery[0].toFixed(1)}</span>
        </div>
        <Slider value={flattery} onValueChange={setFlattery} min={0.5} max={4} step={0.1} thickness={16} />
      </div>
    </div>
  );
}

function DisplacementDemo() {
  const [scale, setScale] = useState([4]);
  const [freq, setFreq] = useState([0.2]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-[Bangers] text-lg tracking-wide text-center">Original</span>
          <div className="bg-[#eab308] border-4 border-black p-6 text-center">
            <span className="font-[Bangers] text-4xl tracking-widest text-black">POW UI</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-[Bangers] text-lg tracking-wide text-center">Displaced</span>
          <Filters.Displacement scale={scale[0]} frequency={freq[0]}>
            <div className="bg-[#eab308] border-4 border-black p-6 text-center">
              <span className="font-[Bangers] text-4xl tracking-widest text-black">POW UI</span>
            </div>
          </Filters.Displacement>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <label className="font-bold">Scale</label>
          <span className="font-[Bangers] text-xl text-amber-600">{scale[0]}</span>
        </div>
        <Slider value={scale} onValueChange={setScale} min={1} max={30} step={1} thickness={16} />
        <div className="flex justify-between">
          <label className="font-bold">Frequency</label>
          <span className="font-[Bangers] text-xl text-amber-600">{freq[0].toFixed(2)}</span>
        </div>
        <Slider value={freq} onValueChange={setFreq} min={0.01} max={0.8} step={0.01} thickness={16} />
      </div>
    </div>
  );
}

function ChromaAberrDemo() {
  const [offset, setOffset] = useState([3]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-[Bangers] text-lg tracking-wide text-center">Original</span>
          <div className="bg-white border-4 border-black p-6 text-center">
            <span className="font-[Bangers] text-4xl tracking-widest">POW UI</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-[Bangers] text-lg tracking-wide text-center">Chroma Aberr.</span>
          <Filters.ChromaAberr offset={offset[0]}>
            <div className="bg-white border-4 border-black p-6 text-center">
              <span className="font-[Bangers] text-4xl tracking-widest">POW UI</span>
            </div>
          </Filters.ChromaAberr>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <label className="font-bold">RGB Offset</label>
          <span className="font-[Bangers] text-xl text-amber-600">{offset[0]}</span>
        </div>
        <Slider value={offset} onValueChange={setOffset} min={0} max={15} step={0.5} thickness={16} />
      </div>
    </div>
  );
}

function PosterizeDemo() {
  const [buckets, setBuckets] = useState([4]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-[Bangers] text-lg tracking-wide text-center">Original</span>
          <div className="bg-gradient-to-br from-amber-400 to-red-500 border-4 border-black p-6 text-center">
            <span className="font-[Bangers] text-4xl tracking-widest text-white">POW UI</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-[Bangers] text-lg tracking-wide text-center">Posterized</span>
          <Filters.Posterize buckets={buckets[0]}>
            <div className="bg-gradient-to-br from-amber-400 to-red-500 border-4 border-black p-6 text-center">
              <span className="font-[Bangers] text-4xl tracking-widest text-white">POW UI</span>
            </div>
          </Filters.Posterize>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <label className="font-bold">Color Buckets</label>
          <span className="font-[Bangers] text-xl text-amber-600">{buckets[0]}</span>
        </div>
        <Slider value={buckets} onValueChange={setBuckets} min={2} max={10} step={1} thickness={16} />
      </div>
    </div>
  );
}

function SpiderSenseDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h4 className="font-[Bangers] text-xl tracking-wide">Hover each to trigger</h4>
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="flex flex-col items-center gap-2">
          <SpiderSenseWrapper trigger="hover" shape="zigzag">
            <Button size="lg" className="font-[Bangers] tracking-wider text-lg">
              Zigzag Hover
            </Button>
          </SpiderSenseWrapper>
          <span className="text-sm font-bold text-gray-500">shape: zigzag</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SpiderSenseWrapper trigger="hover" shape="line">
            <Button size="lg" variant="secondary" className="font-[Bangers] tracking-wider text-lg">
              Line Hover
            </Button>
          </SpiderSenseWrapper>
          <span className="text-sm font-bold text-gray-500">shape: line</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SpiderSenseWrapper trigger="click" shape="zigzag">
            <Button size="lg" variant="outline" className="font-[Bangers] tracking-wider text-lg">
              Click Me!
            </Button>
          </SpiderSenseWrapper>
          <span className="text-sm font-bold text-gray-500">trigger: click</span>
        </div>
      </div>
    </div>
  );
}

function TooltipDemo() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-4">Normal Style — All Sides</h4>
        <div className="flex flex-wrap gap-6 justify-center items-center py-4">
          {(["top", "bottom", "left", "right"] as const).map((side) => (
            <Tooltip
              key={side}
              triggerContent={<Button variant="outline" className="capitalize">{side}</Button>}
              content={`${side.charAt(0).toUpperCase() + side.slice(1)} tooltip!`}
              side={side}
              type="normal"
            />
          ))}
        </div>
      </div>
      <div className="border-t-4 border-black my-2" />
      <div>
        <h4 className="font-[Bangers] text-xl tracking-wide mb-4">Bubble Style</h4>
        <div className="flex flex-wrap gap-6 justify-center items-center py-4">
          <Tooltip
            triggerContent={<Button>Bubble (normal path)</Button>}
            content="Bubbles floating up!"
            side="top"
            type="bubbles"
            bubblePath="normal"
          />
          <Tooltip
            triggerContent={<Button variant="secondary">Bubble (arc path)</Button>}
            content="Arcing through the air!"
            side="top"
            type="bubbles"
            bubblePath="arc"
          />
        </div>
      </div>
    </div>
  );
}

function ToastDemo() {
  const toasts = [
    {
      label: "Default",
      variant: "default" as const,
      title: "HEY! Something happened.",
      description: "Here is what you need to know.",
      className: "bg-white",
    },
    {
      label: "Success",
      variant: "success" as const,
      title: "POW! Mission complete!",
      description: "Everything worked out great.",
      className: "bg-green-500 text-white",
    },
    {
      label: "Error",
      variant: "error" as const,
      title: "ZAP! Something broke!",
      description: "Check the console, hero.",
      className: "bg-red-500 text-white",
    },
    {
      label: "Warning",
      variant: "warning" as const,
      title: "UH-OH! Watch out!",
      description: "Proceed with caution.",
      className: "bg-orange-500 text-white",
    },
    {
      label: "Info",
      variant: "info" as const,
      title: "HMM... Good to know.",
      description: "Just a heads up for you.",
      className: "bg-blue-500 text-white",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <h4 className="font-[Bangers] text-xl tracking-wide mb-2">Click to fire each variant</h4>
      <div className="flex flex-wrap gap-3">
        {toasts.map(({ label, variant, title, description }) => (
          <Button
            key={variant}
            onClick={() => comicToast[variant](title, description)}
            variant={variant === "error" ? "destructive" : variant === "default" ? "default" : "secondary"}
            className={variant === "success" ? "bg-green-600 text-white border-black hover:bg-green-700" :
                       variant === "warning" ? "bg-orange-500 text-white border-black hover:bg-orange-600" :
                       variant === "info" ? "bg-blue-600 text-white border-black hover:bg-blue-700" : ""}
          >
            {label} Toast
          </Button>
        ))}
      </div>
      <p className="text-sm font-bold text-gray-500 mt-2">
        Toasts appear in the bottom-right corner. Keep clicking — they stack!
      </p>
    </div>
  );
}

function SkeletonDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between mb-2">
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
            <Skeleton className="size-16 rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-32 w-full rounded-xl" />
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
              <p className="font-bold text-gray-500">@powui</p>
            </div>
          </div>
          <p className="font-[Walter_Turncoat] font-bold text-lg">
            Making the web more exciting, one punch at a time! Built with React, Tailwind, and pure comic energy.
          </p>
          <div className="border-4 border-black rounded-xl spotty-dot-sm spotty-spacing-sm spotty-opacity-20 spotty-bg-[#eab308] h-32 flex items-center justify-center">
            <span className="font-[Bangers] text-3xl tracking-widest">Content loaded!</span>
          </div>
        </div>
      )}
    </div>
  );
}

function OnomatopoeiaDemo() {
  const { domElement, trigger } = useEventOnomatopoeia({ showClickBurst: true });

  const words = ["POW!", "ZAP!", "BAM!", "WHAM!", "CRASH!"];

  return (
    <div className="flex flex-col gap-4 w-full">
      {domElement}
      <h4 className="font-[Bangers] text-xl tracking-wide">Click the buttons to trigger effects!</h4>
      <div className="flex flex-wrap gap-3">
        {words.map((word) => (
          <Button
            key={word}
            variant="outline"
            className="font-[Bangers] text-xl tracking-wider"
            onClick={(e) => {
              trigger({
                x: e.clientX,
                y: e.clientY + window.scrollY,
                displayElement: (
                  <div className="font-[Bangers] text-3xl text-black select-none">
                    {word}
                  </div>
                ),
              });
            }}
          >
            {word}
          </Button>
        ))}
      </div>
      <p className="text-sm font-bold text-gray-500">
        The GlobalClickEffect in the layout also fires on every click across the site.
      </p>
    </div>
  );
}

// ─── Demo Registry ────────────────────────────────────────────────────────────

export const COMPONENT_DEMOS: ComponentDemo[] = [
  {
    id: "button",
    label: "Button",
    group: "Primitives",
    description:
      "Bold, tactile buttons with press-down physics, thick comic borders, and multiple variants.",
    demo: <ButtonDemo />,
  },
  {
    id: "avatar",
    label: "Avatar",
    group: "Primitives",
    description:
      "Character portraits with heavy black outlines, custom border colors, and image fallbacks.",
    demo: <AvatarDemo />,
  },
  {
    id: "checkbox",
    label: "Checkbox",
    group: "Primitives",
    description:
      "Comic-style checkboxes with optional labels and line-through strike when checked.",
    demo: <CheckboxDemo />,
  },
  {
    id: "slider",
    label: "Slider",
    group: "Primitives",
    description:
      "Sliders with circular or rectangular thumbs, configurable thickness, and active feedback.",
    demo: <SliderDemo />,
  },
  {
    id: "tabs",
    label: "Tabs",
    group: "Layout",
    description:
      "Tab panels with configurable placement — top, bottom, left, or right. Active tabs scale and pop.",
    demo: <TabsDemo />,
  },
  {
    id: "sheet",
    label: "Sheet",
    group: "Layout",
    description:
      "Slide-in drawer/modal panels that can enter from any edge of the screen.",
    demo: <SheetDemo />,
  },
  {
    id: "burst",
    label: "Burst Wrapper",
    group: "Visual Effects",
    description:
      "Wrap any content in a jagged comic-book burst/star shape with configurable spikes and borders.",
    demo: <BurstDemo />,
  },
  {
    id: "cloud",
    label: "Cloud Wrapper",
    group: "Visual Effects",
    description:
      "Soft cloud-shaped SVG clip paths for speech bubbles and fluffy containers.",
    demo: <CloudDemo />,
  },
  {
    id: "displacement",
    label: "Displacement",
    group: "Visual Effects",
    description:
      "SVG feTurbulence + feDisplacementMap filter for a wavy, organic distortion effect.",
    demo: <DisplacementDemo />,
  },
  {
    id: "chromaaberr",
    label: "Chroma Aberr.",
    group: "Visual Effects",
    description:
      "RGB channel separation for a retro chromatic aberration effect — like a busted CRT.",
    demo: <ChromaAberrDemo />,
  },
  {
    id: "posterize",
    label: "Posterize",
    group: "Visual Effects",
    description:
      "Reduces the color palette to a fixed number of buckets, creating a flat screen-print look.",
    demo: <PosterizeDemo />,
  },
  {
    id: "spidersense",
    label: "Spider Sense",
    group: "Visual Effects",
    description:
      "Burst animation lines from an element using mojs. Supports hover, click, or manual trigger.",
    demo: <SpiderSenseDemo />,
  },
  {
    id: "tooltip",
    label: "Tooltip",
    group: "Feedback",
    description:
      "Comic-style tooltips with bounce animation, comic arrow, or bubble path animation.",
    demo: <TooltipDemo />,
  },
  {
    id: "toast",
    label: "Toast",
    group: "Feedback",
    description:
      "Comic-book halftone toast notifications in five variants — each with a signature badge word.",
    demo: <ToastDemo />,
  },
  {
    id: "skeleton",
    label: "Skeleton",
    group: "Feedback",
    description:
      "Pulsing placeholder shapes for loading states. Toggle to reveal real content.",
    demo: <SkeletonDemo />,
  },
  {
    id: "onomatopoeia",
    label: "Onomatopoeia",
    group: "Feedback",
    description:
      "Portal-based click effects with SVG burst lines and random comic word animations.",
    demo: <OnomatopoeiaDemo />,
  },
];
