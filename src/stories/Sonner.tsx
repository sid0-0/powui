import { Toaster, comicToast } from "@/components/ui/sonner";

const variants = [
  {
    label: "HEY! (Default)",
    fn: () =>
      comicToast.default(
        "Narrator Box",
        "Something happened, and the narrator felt the need to mention it."
      ),
    bg: "#eab308",
  },
  {
    label: "POW! (Success)",
    fn: () =>
      comicToast.success(
        "Mission Accomplished!",
        "The hero saved the day. Again. Obviously."
      ),
    bg: "#bbf7d0",
  },
  {
    label: "ZAP! (Error)",
    fn: () =>
      comicToast.error(
        "Villain Escaped!",
        "He slipped through the sewers. Classic."
      ),
    bg: "#fecaca",
  },
  {
    label: "UH-OH! (Warning)",
    fn: () =>
      comicToast.warning(
        "Incoming Danger",
        "Radar is picking up something. Could be nothing. Probably isn't."
      ),
    bg: "#fed7aa",
  },
  {
    label: "HMM... (Info)",
    fn: () =>
      comicToast.info(
        "Did You Know?",
        "Bats are the only mammals capable of sustained flight."
      ),
    bg: "#bfdbfe",
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
        <button
          key={v.label}
          onClick={v.fn}
          style={{
            padding: "8px 16px",
            border: "3px solid black",
            background: v.bg,
            fontFamily: "'Bangers', cursive",
            fontSize: "16px",
            letterSpacing: "0.06em",
            cursor: "pointer",
            boxShadow: "4px 4px 0 rgba(0,0,0,1)",
            transition: "box-shadow 0.08s, transform 0.08s",
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "1px 1px 0 rgba(0,0,0,1)";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translate(3px, 3px)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "4px 4px 0 rgba(0,0,0,1)";
            (e.currentTarget as HTMLButtonElement).style.transform = "";
          }}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
};
