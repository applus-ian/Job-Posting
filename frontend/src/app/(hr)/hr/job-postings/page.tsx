import { SidebarLayout } from "@/components/sidebar-layout";
import { JobPosting, columns } from "@/components/tables/JobColumns";
import { DataTable } from "@/components/tables/DataTable";
async function getData(): Promise<JobPosting[]> {
  return [
    {
      id: "job001",
      title: "Frontend Developer",
      role: "Engineering",
      status: "open",
      applicants: 12,
    },
    {
      id: "job002",
      title: "UI/UX Designer",
      role: "Design",
      status: "closed",
      applicants: 7,
    },
    {
      id: "job003",
      title: "Product Manager",
      role: "Product",
      status: "draft",
      applicants: 0,
    },
  ];
}

export default async function JobPostingPage() {
  const data = await getData();

  return (
    <SidebarLayout>
      <DataTable columns={columns} data={data} />
    </SidebarLayout>
  );
}
