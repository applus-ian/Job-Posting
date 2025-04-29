"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";
import { ApplicationCard } from "@/components/application/ApplicationCard";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <SidebarLayout>
      <ApplicationCard />
    </SidebarLayout>
  );
}
