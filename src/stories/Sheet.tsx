import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type Side = "top" | "right" | "bottom" | "left";

const SIDE_LABEL: Record<Side, string> = {
  right: "From the right!",
  left: "From the left!",
  top: "From the top!",
  bottom: "From the bottom!",
};

const SIDE_TITLE: Record<Side, string> = {
  right: "SECRET FILES",
  left: "FROM THE LEFT!",
  top: "INCOMING!",
  bottom: "FROM BELOW!",
};

const SidePanel = ({ side }: { side: Side }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button>{SIDE_LABEL[side]}</Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>{SIDE_TITLE[side]}</SheetTitle>
        <SheetDescription>You weren't supposed to see this...</SheetDescription>
      </SheetHeader>
      <div className="px-4 font-[Walter_Turncoat] text-base leading-relaxed">
        <p>
          Clark Kent is SUPERMAN. Bruce Wayne is BATMAN. Peter Parker is
          SPIDER-MAN. Now you know.
        </p>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="accent">Got it!</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export const StorybookSheet = () => (
  <div className="grid grid-cols-2 place-items-center gap-4">
    <SidePanel side="top" />
    <SidePanel side="right" />
    <SidePanel side="left" />
    <SidePanel side="bottom" />
  </div>
);
