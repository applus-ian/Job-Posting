"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import JobSearchBar from "@/components/job/JobSearchBar";
import { ApplicationsTable } from "@/components/tables/applicant-applications/ApplicationsTable";
import { useApplicationColumns } from "@/components/tables/applicant-applications/ApplicationsColumns";
import { useApplicantApplicationsQuery } from "@/hooks/query/useApplicantApplicationsQuery";

export default function MyApplicationPage() {
  const columns = useApplicationColumns();
  const { data } = useApplicantApplicationsQuery();

  return (
    <SidebarLayout>
      <div className="mb-3">
        <p className="text-2xl font-medium">My Applications</p>
      </div>
      <JobSearchBar />
      <ApplicationsTable columns={columns} data={data?.applications ?? []} />
    </SidebarLayout>
  );
}
