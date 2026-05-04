import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const TabsContext = React.createContext<{
  orientation: "horizontal" | "vertical";
  tabWidth: string;
  tabHeight: string | undefined;
}>({ orientation: "horizontal", tabWidth: "120px", tabHeight: undefined });

function Tabs({
  className,
  orientation = "horizontal",
  tabWidth = "120px",
  tabHeight,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  tabWidth?: string;
  tabHeight?: string;
}) {
  const resolvedOrientation = orientation ?? "horizontal";
  return (
    <TabsContext.Provider value={{ orientation: resolvedOrientation, tabWidth, tabHeight }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        orientation={resolvedOrientation}
        className={cn(
          "flex",
          resolvedOrientation === "vertical" ? "flex-row items-stretch" : "flex-col",
          className,
        )}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  style,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { orientation, tabWidth } = React.useContext(TabsContext);
  // In vertical mode, the list width = tabWidth + left overflow room for scale-125
  // scale-125 bleeds 12.5% of the trigger width to the left, so we pad by that amount
  const listStyle =
    orientation === "vertical"
      ? { width: `calc(${tabWidth} * 1.125)`, paddingLeft: `calc(${tabWidth} * 0.125)`, ...style }
      : style;
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      style={listStyle}
      className={cn(
        "text-muted-foreground no-scrollbar",
        orientation === "vertical"
          ? "flex flex-col items-stretch overflow-y-auto overflow-x-visible"
          : "inline-flex items-center max-w-full overflow-auto pt-2",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  style,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { orientation, tabHeight } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      onClick={(e) => {
        (e.target as HTMLElement).scrollIntoView();
      }}
      data-slot="tabs-trigger"
      style={
        orientation === "horizontal" && tabHeight
          ? { height: tabHeight, ...style }
          : style
      }
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex flex-1 items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        orientation === "vertical"
          ? cn(
              "w-full whitespace-normal",
              // Active state: pop right toward content, open right border
              "data-[state=active]:-translate-x-[12.5%] data-[state=active]:translate-y-[6.25%] data-[state=active]:first:translate-y-[12.5%] data-[state=active]:last:translate-y-[-12.5%] data-[state=active]:z-10 data-[state=active]:scale-125 data-[state=active]:border-4 data-[state=active]:border-r-0 dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input data-[state=active]:brightness-100 data-[state=active]:[--spotty-spacing:0.12rem]",
              // Base: stacked borders — all items share top/side borders, last adds bottom
              "border-t-4 last:border-b-4 border-x-4 border-black bg-white brightness-60 hover:brightness-80",
            )
          : cn(
              "h-[calc(100%-1px)]",
              // Active state: pop up, open bottom border
              "data-[state=active]:last:translate-x-[-12.5%] data-[state=active]:first:translate-x-[12.5%] data-[state=active]:translate-x-[6.25%] data-[state=active]:translate-y-[-6.25%] data-[state=active]:z-10 data-[state=active]:scale-125 data-[state=active]:border-4 data-[state=active]:border-b-0 dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input data-[state=active]:brightness-100 data-[state=active]:[--spotty-spacing:0.12rem]",
              // Base: side-by-side borders — all share top/bottom borders, last adds right
              "border-l-4 last:border-r-4 border-y-4 border-black bg-white brightness-60 hover:brightness-80",
            ),
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const { orientation } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
        className={cn(
          "outline-none border-4 border-black",
          orientation === "vertical" ? "border-l-0 flex-1 min-w-0 self-stretch flex flex-col [&>*]:flex-1" : "border-t-0",
          className,
        )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
