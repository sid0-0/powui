import * as React from "react";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import { Filters } from "@/components/ui/filters";

// ─── Design tokens per variant ───────────────────────────────────────────────

export type ComicToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info";

const variantTokens: Record<
  ComicToastVariant,
  { badge: string; bg: string; rotate: string; badgeBg: string }
> = {
  default: { badge: "HEY!",   bg: "#f59e0b", rotate: "-3deg", badgeBg: "#fcd34d" },
  success: { badge: "POW!",   bg: "#16a34a", rotate: "3deg",  badgeBg: "#4ade80" },
  error:   { badge: "ZAP!",   bg: "#dc2626", rotate: "-4deg", badgeBg: "#f87171" },
  warning: { badge: "UH-OH!", bg: "#ea580c", rotate: "2deg",  badgeBg: "#fb923c" },
  info:    { badge: "HMM...", bg: "#2563eb", rotate: "-2deg", badgeBg: "#60a5fa" },
};

// ─── Comic toast JSX ─────────────────────────────────────────────────────────

interface ComicToastProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ComicToastVariant;
}

export function ComicToast({
  title,
  description,
  variant = "default",
}: ComicToastProps) {
  const { badge, bg, rotate, badgeBg } = variantTokens[variant];
  const isDark = ["success", "error", "warning", "info"].includes(variant);
  const textColor = isDark ? "white" : "black";

  return (
    <Filters.Displacement scale={2} frequency={0.65}>
      <div
        style={{
          position: "relative",
          padding: "20px 12px 12px",
          border: "4px solid black",
          boxShadow: "10px 10px 0 rgba(0,0,0,1)",
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.25) 1.2px, transparent 1.2px)`,
          backgroundSize: "8px 8px",
          backgroundColor: bg,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Exclamation badge — top-right corner */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "-14px",
            right: "10px",
            backgroundColor: badgeBg,
            border: "3px solid black",
            borderRadius: "4px",
            padding: "1px 8px",
            fontFamily: "'Bangers', cursive",
            fontSize: "14px",
            letterSpacing: "0.08em",
            color: "black",
            transform: `rotate(${rotate})`,
            boxShadow: "3px 3px 0 rgba(0,0,0,0.85)",
            zIndex: 10,
            whiteSpace: "nowrap",
            lineHeight: 1.4,
          }}
        >
          {badge}
        </span>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "20px",
            letterSpacing: "0.05em",
            color: textColor,
            lineHeight: 1.2,
            marginBottom: description ? "6px" : 0,
            textShadow: isDark ? "1px 1px 0 rgba(0,0,0,0.4)" : "none",
          }}
        >
          {title}
        </div>

        {/* Description — solid pill for legibility over halftone */}
        {description && (
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.92)",
              border: "2px solid black",
              borderRadius: "3px",
              padding: "3px 8px",
              fontFamily: "'Walter Turncoat', cursive",
              fontSize: "13px",
              color: "black",
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </Filters.Displacement>
  );
}

// ─── Convenience fire functions ───────────────────────────────────────────────

function fireComicToast(
  variant: ComicToastVariant,
  title: React.ReactNode,
  description?: React.ReactNode
) {
  toast.custom(() => (
    <ComicToast title={title} description={description} variant={variant} />
  ));
}

export const comicToast = {
  default: (title: React.ReactNode, description?: React.ReactNode) =>
    fireComicToast("default", title, description),
  success: (title: React.ReactNode, description?: React.ReactNode) =>
    fireComicToast("success", title, description),
  error: (title: React.ReactNode, description?: React.ReactNode) =>
    fireComicToast("error", title, description),
  warning: (title: React.ReactNode, description?: React.ReactNode) =>
    fireComicToast("warning", title, description),
  info: (title: React.ReactNode, description?: React.ReactNode) =>
    fireComicToast("info", title, description),
};

// ─── Toaster (place once in app root) ────────────────────────────────────────

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      style={{ "--width": "340px" } as React.CSSProperties}
      {...props}
    />
  );
};

export { Toaster };
