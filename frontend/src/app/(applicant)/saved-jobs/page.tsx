import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";

export default function BrowseJobPage() {
  return (
    <SidebarLayout>
      <JobBoard />
    </SidebarLayout>
  );
}
