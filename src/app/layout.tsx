import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "PowUI - A playful React component library",
  description:
    "PowUI is a punchy, comic-inspired UI library for interfaces that need to pack a visual punch. With bold colors, dynamic shapes, and fun animations, PowUI brings the energy and excitement of comic books to your web applications. Whether you're building a game, a creative portfolio, or just want to add some flair to your UI, PowUI has the components you need to make your interface pop.",
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { title: "Home", path: "/" },
  { title: "Components", path: "/components" },
];

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tabs>
      <TabsList>
        {tabs.map((x) => (
          <TabsTrigger
            key={x.title}
            value={x.title}
            className="spotty-bg-[#eab308] font-bold"
          >
            {x.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((x) => (
        <TabsContent key={x.title} value={x.title} className="font-semibold">
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Container>{children}</Container>
        </div>
      </body>
    </html>
  );
}
