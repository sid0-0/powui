import Link from "next/link";
import { Github } from "lucide-react";
import { HoverWrap } from "./website/Hoverwrap";

export function NavBar() {
  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 h-18 border-b-4 border-black
                 spotty-dot-sm spotty-spacing-sm spotty-opacity-30 spotty-bg-[#eab308]
                 flex items-center justify-between pr-6"
    >
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
        <HoverWrap>
          <div className="border-3 border-black bg-white px-4 py-1.5 shadow-[-3px_3px_0_black] flex items-center h-9">
            <Link
              href="/components"
              className="font-bold text-sm text-black no-underline"
            >
              Components
            </Link>
          </div>
        </HoverWrap>
        <HoverWrap>
          <div className="border-3 border-black bg-white px-4 py-1.5 shadow-[-3px_3px_0_black] flex items-center h-9">
            <a
              href="https://github.com/sid0-0/powui"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm text-black no-underline flex items-center gap-1.5"
            >
              <Github className="size-4" />
              GitHub ↗
            </a>
          </div>
        </HoverWrap>
      </div>
    </nav>
  );
}
