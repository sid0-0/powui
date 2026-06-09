import type { Metadata } from "next";
import "../index.css";
import { NavBar } from "@/components/NavBar";
import { GlobalBackground } from "@/components/GlobalBackground";
import { GlobalClickEffect } from "@/components/GlobalClickEffect";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/website/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "PowUI — Comic-book React components",
  description:
    "PowUI is a punchy, comic-inspired UI library for interfaces that need to pack a visual punch. Bold colors, dynamic shapes, and fun animations — making the web more exciting, one punch at a time.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Fixed global background — client island so Filters object property works */}
          <GlobalBackground />

          <div id="root" className="flex flex-col h-screen">
            <NavBar />
            {children}
          </div>

          <GlobalClickEffect />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
