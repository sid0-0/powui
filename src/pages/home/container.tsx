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
