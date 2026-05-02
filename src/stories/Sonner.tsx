import { Toaster, comicToast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const variants = [
  {
    label: "HEY! (Default)",
    className: "spotty-bg-[#f59e0b] hover:spotty-bg-[#d97706]",
    fn: () =>
      comicToast.default(
        "Narrator Box",
        "Something happened, and the narrator felt the need to mention it."
      ),
  },
  {
    label: "POW! (Success)",
    className: "spotty-bg-[#16a34a] hover:spotty-bg-[#15803d] text-white",
    fn: () =>
      comicToast.success(
        "Mission Accomplished!",
        "The hero saved the day. Again. Obviously."
      ),
  },
  {
    label: "ZAP! (Error)",
    className: "spotty-bg-[#dc2626] hover:spotty-bg-[#b91c1c] text-white",
    fn: () =>
      comicToast.error(
        "Villain Escaped!",
        "He slipped through the sewers. Classic."
      ),
  },
  {
    label: "UH-OH! (Warning)",
    className: "spotty-bg-[#ea580c] hover:spotty-bg-[#c2410c] text-white",
    fn: () =>
      comicToast.warning(
        "Incoming Danger",
        "Radar is picking up something. Could be nothing. Probably isn't."
      ),
  },
  {
    label: "HMM... (Info)",
    className: "spotty-bg-[#2563eb] hover:spotty-bg-[#1d4ed8] text-white",
    fn: () =>
      comicToast.info(
        "Did You Know?",
        "Bats are the only mammals capable of sustained flight."
      ),
  },
] as const;

export const StorybookSonner = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <Toaster />
      {variants.map((v) => (
        <Button key={v.label} className={v.className} onClick={v.fn}>
          {v.label}
        </Button>
      ))}
    </div>
  );
};
