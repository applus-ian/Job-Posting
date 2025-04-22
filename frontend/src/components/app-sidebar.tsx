"use client";

import * as React from "react";
import { Bookmark, Command, Folder, GalleryVerticalEnd, Home, Search } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: Command,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Browse Job",
        url: "/browse-jobs",
        icon: Search,
        isActive: pathname === "/browse-jobs",
      },
      {
        title: "My Applications",
        url: "/my-applications",
        icon: Folder,
        isActive: pathname === "/my-applications",
      },
      {
        title: "Saved Jobs",
        url: "/saved-jobs",
        icon: Bookmark,
        isActive: pathname === "/saved-jobs",
      },
    ],
  };

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Applus</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
