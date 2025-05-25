"use client";
import { ApplicationOverviewCard } from "@/components/application/ApplicationOverviewCard";
import { ActionCard } from "@/components/application/ActionCard";
import { DocumentCard } from "@/components/application/DocumentCard";
import { HRStatusCard } from "@/components/application/HRStatusCard";
import { FeedbackCard } from "@/components/interview/FeedbackCard";
import { InterviewerCard } from "@/components/interview/InterviewerCard";
import { InterviewSummaryCard } from "@/components/interview/InterviewSummaryCard";
import { SidebarLayout } from "@/components/sidebar-layout";
import { useViewApplicationQuery } from "@/hooks/query/useViewApplicationQuery";
import { SkeletonApplication } from "@/components/skeletons/SkeletonApplication";
import { formatFullName } from "@/utils/formatFullName";

export default function ViewApplicationPage() {
  const { data, isLoading } = useViewApplicationQuery();

  if (isLoading || !data) {
    return (
      <SidebarLayout
        breadcrumbs={[
          { label: "Applications", href: "/my-applications" },
          { label: "Loading...", isCurrentPage: true },
          { label: "Loading...", isCurrentPage: true },
        ]}
      >
        <SkeletonApplication />
      </SidebarLayout>
    );
  }

  const fullName = formatFullName(
    data.applicant.first_name,
    data.applicant.middle_name,
    data.applicant.last_name,
    data.applicant.suffix
  );

  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Applications", href: "/hr/applications" },
        { label: fullName, href: `/hr/applications/${data.applicant.id}/applicant` },
        { label: `${data.application.job_posting.title} Application`, isCurrentPage: true },
      ]}
    >
      <div className="mt-2">
        <p className="text-xl">Application Details</p>
        <div className="flex flex-col lg:flex-row w-full gap-3 mt-4">
          <div className="flex flex-col lg:w-2/3 w-full gap-3">
            <ApplicationOverviewCard
              applicant={data.applicant}
              application={data.application}
              jobposting={data.jobposting}
              fullname={fullName}
              is_saved={data.is_saved}
              saved_applicant_id={data.saved_applicant_id}
            />
            <DocumentCard documents={data.documents} />
            {data.interview && <FeedbackCard feedback={data.interview.feedback} />}
          </div>
          <div className="flex flex-col lg:w-1/3 w-full gap-3">
            <ActionCard />
            <HRStatusCard />
            {data.interview && <InterviewSummaryCard interview={data.interview} />}
            <InterviewerCard />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
