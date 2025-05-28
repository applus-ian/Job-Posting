"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { AllApplicationTable } from "@/components/tables/all-applications/AllApplicationTable";
import { useAllApplicationColumns } from "@/components/tables/all-applications/AllApplicationColumns";
import { useViewAllApplicationQuery } from "@/hooks/query/useViewAllApplicationQuery";
import { SkeletonHrApplications } from "@/components/skeletons/SkeletonHrApplications";

export default function AllApplicationPage() {
  const columns = useAllApplicationColumns();
  const { data, isLoading } = useViewAllApplicationQuery();

  return (
    <SidebarLayout breadcrumbs={[{ label: "Applications", isCurrentPage: true }]}>
      <div className="mb-3">
        <p className="text-2xl font-medium">All Applications</p>
      </div>
      {isLoading ? (
        <SkeletonHrApplications />
      ) : (
        <AllApplicationTable columns={columns} data={data.applications} />
      )}
    </SidebarLayout>
  );
}
