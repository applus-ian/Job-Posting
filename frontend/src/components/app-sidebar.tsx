"use client";

import * as React from "react";
import { Bookmark, Command, Folder, Home, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
  const { data: session } = useSession();
  
  // Use session data or default values
  const userData = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "user@example.com",
    avatar: "", // We'll use a fallback in the NavUser component
  };
  
  const data = {
    user: userData,
    teams: [
      {
        name: "Applus",
        logo: Command,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/hr/dashboard",
        icon: Home,
        isActive: pathname === "/hr/dashboard",
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
              <a href="/hr/dashboard" className="w-full">
                <div className="px-15 py-4">
                  <div className="text-xl font-bold">Applus HR</div>
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
