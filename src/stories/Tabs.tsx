import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const StorybookTabs = (props: {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
  orientation?: "horizontal" | "vertical";
  tabWidth?: string;
  tabHeight?: string;
}) => {
  const { tabs, orientation, tabWidth, tabHeight } = props;
  return (
    <Tabs
      className="w-3/4 mx-auto filter-[url(#displacementFilter)]"
      defaultValue={tabs[0].title}
      orientation={orientation || "horizontal"}
      tabWidth={tabWidth}
      tabHeight={tabHeight}
    >
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
          {x.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
