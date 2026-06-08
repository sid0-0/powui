"use client";

import { useEffect } from "react";
import { useEventOnomatopoeia } from "@/components/ui/onomatopoeia";

// const WORDS = ["POW!", "ZAP!", "BAM!", "WHAM!", "CRASH!", "KA-POW!", "BIFF!"];

export function GlobalClickEffect() {
  const { domElement, trigger } = useEventOnomatopoeia({
    showClickBurst: true,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // const word = WORDS[Math.floor(Math.random() * WORDS.length)];
      trigger({
        x: e.pageX,
        y: e.pageY,
        displayElement: (
          <div className="font-[Walter_Turncoat] text-2xl select-none pointer-events-none">
            Click!
          </div>
        ),
      });
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [trigger]);

  return <>{domElement}</>;
}
