"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { DashboardMessage } from "@/components/dashboard/DashboardMessage";
import { ApplicationCard } from "@/components/application/ApplicationCard";
import { SkeletonDashboard } from "@/components/skeletons/SkeletonDashboard";
import { useProfileQuery } from "@/hooks/query/useProfileQuery";
import { useApplicantApplicationsQuery } from "@/hooks/query/useApplicantApplicationsQuery";

export default function DashboardPage() {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfileQuery();

  const {
    data: applicationsData,
    isLoading: isApplicationsLoading,
    isError: isApplicationsError,
  } = useApplicantApplicationsQuery();

  if (isProfileError || isApplicationsError) return <div>Error loading dashboard</div>;

  return (
    <SidebarLayout breadcrumbs={[{ label: "Dashboard", isCurrentPage: true }]}>
      {isProfileLoading || isApplicationsLoading ? (
        <SkeletonDashboard />
      ) : (
        <>
          <DashboardMessage applicant={profileData.applicant} documents={profileData.documents} />
          {applicationsData?.applications?.length > 0 && (
            <ApplicationCard applications={applicationsData.applications} />
          )}
        </>
      )}
    </SidebarLayout>
  );
}
