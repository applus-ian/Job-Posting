"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    badgeCount?: number;
  }[];
}) {
  return (
    <SidebarMenu className="ps-2">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            className={cn(
              "flex items-center h-10 justify-between w-full px-2 py-2 rounded-none transition-colors",
              item.isActive
                ? "bg-orange-100 border-l-4 border-orange-500 text-orange-600 ps-1"
                : "hover:bg-[rgba(251,190,146,0.2)] hover:border-orange-300 transition-all"
            )}
          >
            <Link href={item.url} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "h-4 w-4 ms-3 sidebar-icon",
                    item.isActive && "text-orange-600 stroke-orange-600"
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-base sidebar-label",
                    item.isActive && item.isActive && "text-orange-600"
                  )}
                >
                  {item.title}
                </span>
              </div>
              {item.badgeCount ? (
                <span className="ml-2 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5">
                  {item.badgeCount}
                </span>
              ) : null}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
