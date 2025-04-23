"use client";

import * as React from "react";
import { Bookmark, Command, Folder, GalleryVerticalEnd, Home, Search } from "lucide-react";
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
            <a href="#" className="w-full">
              <div className="px-15 py-4">
                <Image
                  src="/logo/Logo.png"
                  alt="Applus Logo"
                  width={100}    
                  height={50}        
                  className="object-contain h-auto"
                />
              </div>
            </a>
          </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <span className="text-xs text-muted-foreground ml-4 tracking-wide uppercase text-start">
          Applicant Dashboard
      </span>
      <SidebarContent className="pl-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
