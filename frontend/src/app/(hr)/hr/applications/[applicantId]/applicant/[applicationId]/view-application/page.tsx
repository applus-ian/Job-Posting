import { ApplicationOverviewCard } from "@/components/application/ApplicationOverviewCard";
import { ActionCard } from "@/components/application/ActionCard";
import { DocumentCard } from "@/components/application/DocumentCard";
import { HRStatusCard } from "@/components/application/HRStatusCard";
import { FeedbackCard } from "@/components/interview/FeedbackCard";
import { InterviewerCard } from "@/components/interview/InterviewerCard";
import { InterviewSummaryCard } from "@/components/interview/InterviewSummaryCard";
import { SidebarLayout } from "@/components/sidebar-layout";

export default function ViewApplicationPage() {
  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Applications", href: "/hr/applications" },
        { label: "Mike Arthur Minoza", href: "/hr/applications/1" },
        { label: "HR manager Application", isCurrentPage: true },
      ]}
    >
      <div className="mt-3">
        <p className="text-xl">Application Details</p>
        <div className="flex flex-col lg:flex-row w-full gap-6 mt-4">
          <div className="flex flex-col lg:w-2/3 w-full gap-6">
            <ApplicationOverviewCard />
            <DocumentCard />
            <FeedbackCard />
          </div>
          <div className="flex flex-col lg:w-1/3 w-full gap-6">
            <ActionCard />
            <HRStatusCard />
            <InterviewSummaryCard />
            <InterviewerCard />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
