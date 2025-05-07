"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";
import { ApplicationCard } from "@/components/application/ApplicationCard";
import { SkeletonDashboard } from "@/components/skeletons/SkeletonDashboard";

export default function DashboardPage() {
  return (
    <SidebarLayout>
      <SkeletonDashboard/>
      <DashboardMessage />
      <ApplicationCard />
    </SidebarLayout>
  );
}
