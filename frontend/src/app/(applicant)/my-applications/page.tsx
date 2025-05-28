"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import JobSearchBar from "@/components/job/JobSearchBar";
import { ApplicationsTable } from "@/components/tables/applicant-applications/ApplicationsTable";
import { useApplicationColumns } from "@/components/tables/applicant-applications/ApplicationsColumns";
import { useApplicantApplicationsQuery } from "@/hooks/query/useApplicantApplicationsQuery";
import { SkeletonMyApplications } from "@/components/skeletons/SkeletonMyApplications";

export default function MyApplicationPage() {
  const viewApplicationType = "applicant";
  const columns = useApplicationColumns(viewApplicationType);
  const { data, isLoading } = useApplicantApplicationsQuery();

  return (
    <SidebarLayout breadcrumbs={[{ label: "Applications", isCurrentPage: true }]}>
      <div className="mb-3">
        <p className="text-2xl font-medium">My Applications</p>
      </div>
      {isLoading ? (
        <SkeletonMyApplications />
      ) : (
        <>
          <ApplicationsTable columns={columns} data={data?.applications ?? []} />
        </>
      )}
    </SidebarLayout>
  );
}
