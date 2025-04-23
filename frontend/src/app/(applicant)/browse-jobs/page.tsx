import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import JobSearchBar from "@/components/job/JobSearchBar";

export default function BrowseJobPage() {
  return (
    <SidebarLayout>
      <JobSearchBar/>
      <JobBoard />
    </SidebarLayout>
  );
}
