import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filters } from "@/components/ui/filters";

export const StorybookTabs = (props: {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
  tabsPlacement?: "top" | "bottom" | "left" | "right";
  tabWidth?: string;
  tabHeight?: string;
  activeTabClassName?: string;
}) => {
  const {
    tabs,
    tabsPlacement = "top",
    tabWidth,
    tabHeight,
    activeTabClassName = "data-[state=active]:[--spotty-spacing:0.12rem]",
  } = props;
  return (
    <Filters.Displacement frequency={0.05} containerClassName="w-3/4 mx-auto">
      <Tabs
        defaultValue={tabs[0].title}
        tabsPlacement={tabsPlacement}
        tabWidth={tabWidth}
        tabHeight={tabHeight}
        activeTabClassName={activeTabClassName}
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
    </Filters.Displacement>
  );
};
