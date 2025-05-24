"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobPostingForm } from "@/components/job/JobPostingForm";

export default function CreateJobPostingPage() {
  return (
    <SidebarLayout breadcrumbs={[{ label: "Create JobPosting", isCurrentPage: true }]}>
      <div className="mb-2">
        <p className="text-2xl font-medium">Create Job Posting</p>
        <p className="text-sm text-muted-foreground">
          Enter key details about the role to help attract qualified candidates.
        </p>
      </div>
      <JobPostingForm jobposting={null} />
    </SidebarLayout>
  );
}
