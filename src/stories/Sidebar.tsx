import { useState } from "react";
import { Rocket, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Filters } from "@/components/ui/filters";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

type SubItem = {
  id: string;
  icon?: React.ReactNode;
  label: string;
  content: React.ReactNode;
};

type NavItem = {
  id: string;
  icon?: React.ReactNode;
  label: string;
  content: React.ReactNode;
  subItems?: SubItem[];
};

type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const StorybookSidebar = (props: {
  groups: NavGroup[];
  side?: "left" | "right";
  sidebarWidth?: string;
}) => {
  const { groups, side = "left", sidebarWidth = "10rem" } = props;

  const allItems: SubItem[] = groups.flatMap((g) =>
    g.items.flatMap((item) => [item, ...(item.subItems ?? [])]),
  );
  const [activeItem, setActiveItem] = useState(allItems[0]?.id ?? "");
  const activeContent = allItems.find((i) => i.id === activeItem)?.content;

  const initialExpanded = new Set(
    groups.flatMap((g) =>
      g.items.filter((i) => i.subItems?.length).map((i) => i.id),
    ),
  );
  const [expandedItems, setExpandedItems] =
    useState<Set<string>>(initialExpanded);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-[700px] h-[430px]">
      <Filters.Displacement
        frequency={0.05}
        containerClassName="h-full"
        className="h-full"
      >
        <SidebarProvider
          style={{ "--sidebar-width": sidebarWidth } as React.CSSProperties}
          className="h-full min-h-0"
        >
          <Sidebar side={side} collapsible="none">
            <SidebarHeader>
              <div className="border-4 border-black bg-white spotty-bg-[#eab308] [--spotty-spacing:0.18rem] px-3 py-2 flex items-center gap-2">
                <Rocket className="size-4 shrink-0" />
                <span className="text-xs font-black uppercase tracking-widest leading-tight">
                  Guardians
                  <br />
                  of the Galaxy
                </span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              {groups.map((group, gi) => (
                <SidebarGroup key={gi}>
                  {group.label && (
                    <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  )}
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            isActive={activeItem === item.id}
                            onClick={() => {
                              setActiveItem(item.id);
                            }}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                            {item.subItems && item.subItems.length > 0 && (
                              <ChevronRight
                                className={cn(
                                  "ml-auto size-4 shrink-0 transition-transform duration-200",
                                  expandedItems.has(item.id) && "rotate-90",
                                )}
                                onClick={() => {
                                  setActiveItem(item.id);
                                  if (item.subItems?.length)
                                    toggleExpand(item.id);
                                }}
                              />
                            )}
                          </SidebarMenuButton>
                          {item.subItems && item.subItems.length > 0 && (
                            <div
                              className="grid transition-[grid-template-rows] duration-200 ease-in-out"
                              style={{
                                gridTemplateRows: expandedItems.has(item.id)
                                  ? "1fr"
                                  : "0fr",
                              }}
                            >
                              <div className="overflow-hidden">
                                <SidebarMenuSub>
                                  {item.subItems.map((sub) => (
                                    <SidebarMenuSubItem key={sub.id}>
                                      <SidebarMenuSubButton
                                        asChild
                                        isActive={activeItem === sub.id}
                                      >
                                        <button
                                          onClick={() => setActiveItem(sub.id)}
                                        >
                                          {sub.icon}
                                          <span>{sub.label}</span>
                                        </button>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </div>
                            </div>
                          )}
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
            <SidebarFooter>
              <div className="border-4 border-black bg-white px-3 py-2 flex items-center gap-2 text-xs brightness-60">
                <Sparkles className="size-3 shrink-0" />
                <span className="font-bold truncate">Save the Universe</span>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>{activeContent}</SidebarInset>
        </SidebarProvider>
      </Filters.Displacement>
    </div>
  );
};
