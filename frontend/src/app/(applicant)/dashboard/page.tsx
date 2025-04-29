import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";
import { ApplicationCard } from "@/components/application/ApplicationCard";

export default function DashboardPage() {
  return (
    <SidebarLayout>
      <DashboardMessage />
      <ApplicationCard />
    </SidebarLayout>
  );
}
