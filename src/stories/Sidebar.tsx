import { Rocket, Sparkles } from "lucide-react";
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
  SidebarPanel,
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

  return (
    <div className="w-[700px] h-[430px]">
      <Filters.Displacement frequency={0.05} containerClassName="h-full" className="h-full">
        <SidebarProvider
          defaultValue={allItems[0]?.id}
          style={{ "--sidebar-width": sidebarWidth } as React.CSSProperties}
          className="h-full min-h-0"
        >
          <Sidebar side={side} collapsible="none">
            <SidebarHeader>
              <div className="border-4 border-black bg-white spotty-bg-[#eab308] [--spotty-spacing:0.18rem] px-3 py-2 flex items-center gap-2">
                <Rocket className="size-4 shrink-0" />
                <span className="text-xs font-black uppercase tracking-widest leading-tight">
                  Guardians<br />of the Galaxy
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
                            value={item.id}
                            showChevron={!!item.subItems?.length}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                          {item.subItems && item.subItems.length > 0 && (
                            <SidebarMenuSub>
                              {item.subItems.map((sub) => (
                                <SidebarMenuSubItem key={sub.id}>
                                  <SidebarMenuSubButton asChild value={sub.id}>
                                    <button>
                                      {sub.icon}
                                      <span>{sub.label}</span>
                                    </button>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
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
          <SidebarInset>
            {allItems.map((item) => (
              <SidebarPanel key={item.id} value={item.id}>
                {item.content}
              </SidebarPanel>
            ))}
          </SidebarInset>
        </SidebarProvider>
      </Filters.Displacement>
    </div>
  );
};
