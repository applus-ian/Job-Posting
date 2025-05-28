"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobPostingForm } from "@/components/job/JobPostingForm";
import { useShowJobPosting } from "@/hooks/query/useShowJobPosting";
import { SkeletonHrApplicantProfile } from "@/components/skeletons/SkeletonHrApplicantProfile";

export default function EditJobPostingPage() {
  const { data, isLoading } = useShowJobPosting();

  if (isLoading || !data) {
    return (
      <SidebarLayout
        breadcrumbs={[
          { label: "Applications", href: "/my-applications" },
          { label: "Loading...", isCurrentPage: true },
        ]}
      >
        <SkeletonHrApplicantProfile />
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout
      breadcrumbs={[
        { label: "Job Postings", href: "/hr/job-postings" },
        { label: data.jobposting.title, isCurrentPage: true },
      ]}
    >
      <div className="mb-2">
        <p className="text-2xl font-medium">Edit Job Posting</p>
        <p className="text-sm text-muted-foreground">
          Update the details of this job posting to ensure the information is accurate and up to
          date.
        </p>
      </div>
      <JobPostingForm jobposting={data.jobposting} />
    </SidebarLayout>
  );
}
