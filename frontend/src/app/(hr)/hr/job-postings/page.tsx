"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { SkeletonApplication } from "@/components/skeletons/SkeletonApplication";
import { jobPostingColumn } from "@/components/tables/job/JobColumns";
import { JobTable } from "@/components/tables/job/JobTable";
import { useJobPostingsQuery } from "@/hooks/query/useJobPostingQuery";
import { JobPosting } from "@/types/job";
import { useState } from "react";
import { JobDetailModal } from "@/components/job/JobDetailsModal";

export default function JobPostingPage() {
  const [jobposting, setJobposting] = useState<JobPosting | null>(null);
  const [openModal, setOpenModal] = useState(false);
  // modal actions
  const handleAction = (actionKey: string, jobposting: JobPosting) => {
    if (actionKey === "viewDetails") {
      setJobposting(jobposting);
      setOpenModal(true);
    }
  };
  const { data, isLoading } = useJobPostingsQuery("all");
  const { columns } = jobPostingColumn({ handleAction });

  if (isLoading || !data) {
    return (
      <SidebarLayout breadcrumbs={[{ label: "Job Postings", isCurrentPage: true }]}>
        <SkeletonApplication />
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout breadcrumbs={[{ label: "Job Postings", isCurrentPage: true }]}>
      <div className="mb-2">
        <p className="text-2xl font-medium">All Job Postings</p>
      </div>
      <JobTable columns={columns} data={data.jobpostings} />

      {/* modals  */}
      {jobposting && (
        <JobDetailModal openModal={openModal} setOpenModal={setOpenModal} jobposting={jobposting} />
      )}
    </SidebarLayout>
  );
}
