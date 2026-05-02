import { Toaster, comicToast } from "@/components/ui/sonner";

const variants = [
  {
    label: "HEY! (Default)",
    fn: () =>
      comicToast.default(
        "Narrator Box",
        "Something happened, and the narrator felt the need to mention it."
      ),
    bg: "#f59e0b",
  },
  {
    label: "POW! (Success)",
    fn: () =>
      comicToast.success(
        "Mission Accomplished!",
        "The hero saved the day. Again. Obviously."
      ),
    bg: "#16a34a",
    color: "white",
  },
  {
    label: "ZAP! (Error)",
    fn: () =>
      comicToast.error(
        "Villain Escaped!",
        "He slipped through the sewers. Classic."
      ),
    bg: "#dc2626",
    color: "white",
  },
  {
    label: "UH-OH! (Warning)",
    fn: () =>
      comicToast.warning(
        "Incoming Danger",
        "Radar is picking up something. Could be nothing. Probably isn't."
      ),
    bg: "#ea580c",
    color: "white",
  },
  {
    label: "HMM... (Info)",
    fn: () =>
      comicToast.info(
        "Did You Know?",
        "Bats are the only mammals capable of sustained flight."
      ),
    bg: "#2563eb",
    color: "white",
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
          color: "color" in v ? v.color : "black",
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
