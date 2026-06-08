"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { HoverWrap } from "./website/Hoverwrap";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <Button
      type="button"
      aria-label={`Switch to ${next} mode`}
      onClick={() => setTheme(next)}
      className="border-3 border-foreground bg-card text-foreground p-0 flex items-center justify-center size-9 cursor-pointer"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-6" />
        ) : (
          <Moon className="size-6" />
        )
      ) : (
        <Sun className="size-6 opacity-0" />
      )}
    </Button>
  );
}

export function NavBar() {
  const path = usePathname();
  const isComponentsPage = path.startsWith("/components");
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 h-18 border-b-4 border-foreground spotty-dot-sm spotty-spacing-sm spotty-opacity-30 spotty-bg-accent flex-shrink-0 flex items-center justify-between pr-6">
      <div className="bg-black px-8 justify-center flex items-center h-full">
        <HoverWrap withAnimation>
          <Link
            href="/"
            className="font-[Bangers] text-5xl text-white! no-underline hover:opacity-80 transition-opacity"
          >
            POW UI
          </Link>
        </HoverWrap>
      </div>
      <div className="flex items-center gap-3">
        {!isComponentsPage && (
          <HoverWrap>
            <div className="border-3 border-foreground bg-card text-foreground px-4 py-1.5 shadow-[-6px_6px_0_var(--foreground)] flex items-center h-9">
              <Link
                href="/components"
                className="font-bold text-sm text-foreground no-underline"
              >
                Components
              </Link>
            </div>
          </HoverWrap>
        )}
        <HoverWrap>
          <div className="border-3 border-foreground bg-card text-foreground px-4 py-1.5 shadow-[-6px_6px_0_var(--foreground)] flex items-center h-9">
            <a
              href="https://github.com/sid0-0/powui"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm text-foreground no-underline flex items-center gap-1.5"
            >
              <Github className="size-4" />
              GitHub ↗
            </a>
          </div>
        </HoverWrap>
        <ThemeToggle />
      </div>
    </nav>
  );
}
