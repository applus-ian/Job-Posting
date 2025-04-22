"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";

export default function DashboardPage() {
  return (
    <SidebarLayout>
      <DashboardMessage />
    </SidebarLayout>
  );
}
