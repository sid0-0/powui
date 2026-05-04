import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const TabsContext = React.createContext<{
  orientation: "horizontal" | "vertical";
  tabsPlacement: "top" | "bottom" | "left" | "right";
  tabWidth: string;
  tabHeight: string | undefined;
  activeTabClassName?: string;
}>({
  orientation: "horizontal",
  tabsPlacement: "top",
  tabWidth: "120px",
  tabHeight: undefined,
});

const tabsVariants = cva("flex", {
  variants: {
    tabsPlacement: {
      top: "flex-col",
      bottom: "flex-col-reverse",
      left: "flex-row items-stretch",
      right: "flex-row-reverse items-stretch",
    },
  },
  defaultVariants: {
    tabsPlacement: "top",
  },
});

function Tabs({
  className,
  tabsPlacement = "top",
  tabWidth = "120px",
  tabHeight,
  activeTabClassName,
  style,
  ...props
}: Omit<React.ComponentProps<typeof TabsPrimitive.Root>, "orientation"> &
  VariantProps<typeof tabsVariants> & {
    tabWidth?: string;
    tabHeight?: string;
    activeTabClassName?: string;
  }) {
  const orientation =
    tabsPlacement === "left" || tabsPlacement === "right"
      ? "vertical"
      : "horizontal";
  return (
    <TabsContext.Provider
      value={{
        orientation,
        tabsPlacement,
        tabWidth,
        tabHeight,
        activeTabClassName,
      }}
    >
      <TabsPrimitive.Root
        data-slot="tabs"
        orientation={orientation}
        style={{
          ...(orientation === "vertical"
            ? {
                [tabsPlacement === "left" ? "paddingLeft" : "paddingRight"]:
                  `calc(${tabWidth} * 0.25)`,
              }
            : {}),
          ...style,
        }}
        className={cn(tabsVariants({ tabsPlacement }), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

const tabsListVariants = cva("text-muted-foreground no-scrollbar", {
  variants: {
    tabsPlacement: {
      top: "inline-flex items-stretch max-w-full overflow-auto",
      bottom: "inline-flex items-stretch max-w-full overflow-auto",
      left: "flex flex-col items-stretch",
      right: "flex flex-col items-stretch",
    },
  },
  defaultVariants: {
    tabsPlacement: "top",
  },
});

function TabsList({
  className,
  style,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { tabsPlacement, tabWidth, orientation, tabHeight } =
    React.useContext(TabsContext);

  const listStyle: React.CSSProperties = { ...style };
  if (orientation === "vertical") {
    listStyle.width = tabWidth;
  } else {
    // Bleed padding for horizontal: max(8px fallback, 25% of height)
    const paddingValue = `max(8px, calc(${tabHeight || "2rem"} * 0.25))`;
    if (tabsPlacement === "top") listStyle.paddingTop = paddingValue;
    if (tabsPlacement === "bottom") listStyle.paddingBottom = paddingValue;
  }

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      style={listStyle}
      className={cn(tabsListVariants({ tabsPlacement }), className)}
      {...props}
    />
  );
}

const tabsTriggerVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex flex-1 items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow,transform] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 border-black bg-white brightness-60 hover:brightness-80",
  {
    variants: {
      tabsPlacement: {
        top: [
          "border-l-4 last:border-r-4 border-y-4",
          "data-[state=active]:last:translate-x-[-12.5%] data-[state=active]:first:translate-x-[12.5%] data-[state=active]:translate-x-[6.25%] data-[state=active]:translate-y-[-12.5%] data-[state=active]:z-10 data-[state=active]:scale-125 data-[state=active]:border-4 data-[state=active]:border-b-0 dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input data-[state=active]:brightness-100",
        ],
        bottom: [
          "border-l-4 last:border-r-4 border-y-4",
          "data-[state=active]:last:translate-x-[-12.5%] data-[state=active]:first:translate-x-[12.5%] data-[state=active]:translate-x-[6.25%] data-[state=active]:translate-y-[12.5%] data-[state=active]:z-10 data-[state=active]:scale-125 data-[state=active]:border-4 data-[state=active]:border-t-0 dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input data-[state=active]:brightness-100",
        ],
        left: [
          "w-full whitespace-normal border-t-4 last:border-b-4 border-x-4",
          "data-[state=active]:translate-y-[6.25%] data-[state=active]:first:translate-y-[12.5%] data-[state=active]:last:translate-y-[-12.5%] data-[state=active]:z-10 data-[state=active]:scale-125 data-[state=active]:border-4 data-[state=active]:border-r-0 dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input data-[state=active]:brightness-100 data-[state=active]:-translate-x-[12.5%]",
        ],
        right: [
          "w-full whitespace-normal border-t-4 last:border-b-4 border-x-4",
          "data-[state=active]:translate-y-[6.25%] data-[state=active]:first:translate-y-[12.5%] data-[state=active]:last:translate-y-[-12.5%] data-[state=active]:z-10 data-[state=active]:scale-125 data-[state=active]:border-4 data-[state=active]:border-l-0 dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input data-[state=active]:brightness-100 data-[state=active]:translate-x-[12.5%]",
        ],
      },
    },
    defaultVariants: {
      tabsPlacement: "top",
    },
  },
);

function TabsTrigger({
  className,
  style,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { orientation, tabsPlacement, tabHeight, activeTabClassName } =
    React.useContext(TabsContext);
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
        tabsTriggerVariants({ tabsPlacement }),
        className,
        activeTabClassName,
      )}
      {...props}
    />
  );
}

const tabsContentVariants = cva("outline-none border-4 border-black", {
  variants: {
    tabsPlacement: {
      top: "border-t-0",
      bottom: "border-b-0",
      left: "border-l-0 flex-1 min-w-0 self-stretch flex flex-col [&>*]:flex-1",
      right:
        "border-r-0 flex-1 min-w-0 self-stretch flex flex-col [&>*]:flex-1",
    },
  },
  defaultVariants: {
    tabsPlacement: "top",
  },
});

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const { tabsPlacement } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ tabsPlacement }), className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
