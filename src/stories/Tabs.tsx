import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const StorybookTabs = (props: {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
}) => {
  const { tabs } = props;
  return (
    <Tabs className="w-1/2 mx-auto" defaultValue={tabs[0].title}>
      <TabsList>
        {tabs.map((x) => (
          <TabsTrigger key={x.title} value={x.title}>
            {x.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((x) => (
        <TabsContent key={x.title} value={x.title}>
          {x.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
