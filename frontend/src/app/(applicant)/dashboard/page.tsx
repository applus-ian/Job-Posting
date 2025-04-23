import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";
import { RecentlyApplied } from "@/components/dashboard/DashboardCard";


export default function DashboardPage() {
  return (
    <SidebarLayout>
      <DashboardMessage />
      <RecentlyApplied /> 
    </SidebarLayout>
  );
}
