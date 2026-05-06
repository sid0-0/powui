import { Filters } from "@/components/ui/filters";
import { Button } from "@/components/ui/button";
import { useEventOnomatopoeia } from "@/components/ui/onomatopoeia";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { CloudWrapper } from "@/components/ui/cloud";
import { BurstWrapper } from "@/components/ui/burst";
import type { ReactNode } from "react";
import { SpiderSenseWrapper } from "@/components/ui/spiderSenseWrapper";

const SectionCard = ({
  title,
  children,
  description,
}: {
  title: string;
  children: ReactNode;
  description?: string;
}) => (
  <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[-12px_12px_0_0_rgba(0,0,0,1)] flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold font-[Walter_Turncoat]">{title}</h2>
      {description && (
        <p className="text-gray-600 font-medium">{description}</p>
      )}
    </div>
    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 flex items-center justify-center min-h-[200px]">
      {children}
    </div>
  </div>
);

export const Home = () => {
  const { domElement, trigger } = useEventOnomatopoeia({
    showClickBurst: true,
  });
  return (
    <div
      className="relative min-h-screen selection:bg-amber-300 bg-transparent font-[Walter_Turncoat]"
      onClick={(event) => {
        console.log(event)
        trigger({
          x: event.pageX,
          y: event.pageY,
          displayElement: (
            <div className="font-[Walter_Turncoat] text-2xl">Click!</div>
          ),
        });
      }}
    >
      {domElement}
      {/* Fixed Background */}
      <Filters.Displacement
        scale={3}
        frequency={0.2}
        className="size-full top-0 absolute"
      >
        <div
          id="background"
          className="spotty-dot-xl spotty-spacing-xl spotty-bg-[#eab308] size-full"
        ></div>
      </Filters.Displacement>

      {/* Main Content */}
      <div
        id="content"
        className="relative w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-16"
      >
        {/* Header Section */}
        <header className="flex flex-col gap-6 mt-12">
          <Filters.Displacement scale={3} frequency={0.2}>
            <Button className="bg-white w-80 h-32 text-7xl">Pow UI</Button>
          </Filters.Displacement>
          <div className="mx-auto max-w-2xl bg-white border-4 border-black p-6 rounded-2xl shadow-[-8px_8px_0_0_rgba(0,0,0,1)] mt-4">
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              A punchy, comic-inspired UI library for interfaces that{" "}
              <SpiderSenseWrapper containerClassName="inline">
                <span className="text-amber-500 underline decoration-black underline-offset-4">
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
        </header>

        {/* Showcase Sections */}
        <main className="flex flex-col gap-24">
          <SectionCard
            title="Buttons"
            description="Bold, tactile buttons that feel like they're jumping off the screen."
          >
            <div className="flex flex-wrap gap-8 justify-center">
              <Button size="lg">CLICK ME!</Button>
              <Button variant="destructive" size="lg">
                DANGER!
              </Button>
              <Button variant="secondary" size="lg">
                NEAT.
              </Button>
            </div>
          </SectionCard>

          <SectionCard
            title="Avatar"
            description="Character portraits with heavy outlines and comic-style shadows."
          >
            <div className="flex flex-wrap gap-12 justify-center">
              <Avatar className="size-24">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="size-24 border-amber-500">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>FL</AvatarFallback>
              </Avatar>
            </div>
          </SectionCard>

          <SectionCard
            title="Cloud & Burst Wrappers"
            description="Dynamic, irregular shapes for speech bubbles, action panels, and containers."
          >
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full">
              <CloudWrapper heightVariance={20} flatteryFactor={1.5}>
                <div className="bg-white p-8 border-4 border-black min-w-[200px] text-center font-bold text-xl">
                  I'm a cloud!
                </div>
              </CloudWrapper>
              <BurstWrapper
                curvedDips={false}
                borders={[{ color: "black", scale: 1.1 }]}
              >
                <div className="bg-amber-400 p-8 min-w-[200px] text-center font-black text-2xl italic uppercase">
                  BAM!
                </div>
              </BurstWrapper>
            </div>
          </SectionCard>

          <SectionCard
            title="Interactive Controls"
            description="Inputs and sliders designed for maximum feedback."
          >
            <div className="flex flex-col gap-12 w-full max-w-md">
              <div className="flex items-center gap-4">
                <Checkbox
                  id="terms"
                  label="I agree to the comic code"
                  className="size-8"
                  labelClassName="text-xl font-bold"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="font-bold text-lg">Power Level</label>
                <Slider defaultValue={[80]} max={100} step={1} thickness={24} />
              </div>
            </div>
          </SectionCard>
        </main>

        {/* Footer Section */}
        <footer className="mt-12 mb-24 border-t-8 border-black pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-black uppercase tracking-tighter">
              Pow UI
            </h3>
            <p className="text-gray-700 font-bold">
              Making the web more exciting, one punch at a time.
            </p>
          </div>
          <div className="flex gap-8 font-bold text-lg">
            <a
              href="#"
              className="hover:underline decoration-4 underline-offset-4"
            >
              GitHub
            </a>
            <a
              href="#"
              className="hover:underline decoration-4 underline-offset-4"
            >
              Docs
            </a>
            <a
              href="#"
              className="hover:underline decoration-4 underline-offset-4"
            >
              Examples
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
