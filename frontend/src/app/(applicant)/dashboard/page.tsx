import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";

export default function Page() {
  return (
    <SidebarLayout>
      <DashboardMessage />
    </SidebarLayout>
  );
}
