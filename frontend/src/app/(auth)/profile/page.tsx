import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";
import { Tablists } from "@/components/profile/Tablists";

export default function DashboardPage() {
  return (
    <SidebarLayout>
      <Tablists/>
    </SidebarLayout>
  );
}
