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
  { badge: string; bg: string; rotate: string }
> = {
  default: { badge: "HEY!", bg: "#eab308", rotate: "-3deg" },
  success: { badge: "POW!", bg: "#bbf7d0", rotate: "3deg" },
  error: { badge: "ZAP!", bg: "#fecaca", rotate: "-4deg" },
  warning: { badge: "UH-OH!", bg: "#fed7aa", rotate: "2deg" },
  info: { badge: "HMM...", bg: "#bfdbfe", rotate: "-2deg" },
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
  const { badge, bg, rotate } = variantTokens[variant];

  return (
    <Filters.Displacement scale={2} frequency={0.65}>
      <div
        style={{
          position: "relative",
          padding: "20px 12px 12px",
          border: "4px solid black",
          boxShadow: "10px 10px 0 rgba(0,0,0,1)",
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.35) 1.2px, transparent 1.2px)`,
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
            backgroundColor: bg,
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
            color: "black",
            lineHeight: 1.2,
            marginBottom: description ? "4px" : 0,
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              fontFamily: "'Walter Turncoat', cursive",
              fontSize: "13px",
              color: "black",
              opacity: 0.85,
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
