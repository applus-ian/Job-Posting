"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { SkeletonApplication } from "@/components/skeletons/SkeletonApplication";
import { jobPostingColumn } from "@/components/tables/job/JobColumns";
import { JobTable } from "@/components/tables/job/JobTable";
import { useJobPostingsQuery } from "@/hooks/query/useJobPostingQuery";
import { JobPosting } from "@/types/job";
import { useState } from "react";
import { JobDetailModal } from "@/components/job/JobDetailsModal";
import { JobPostingStatusModal } from "@/components/job/JobPostingStatusModal";
import { useRouter } from "next/navigation";

export default function JobPostingPage() {
  const [jobposting, setJobposting] = useState<JobPosting | null>(null);
  const [openJobPostingModal, setOpenJobPostingModal] = useState(false);
  const [openStatusModal, setStatusModal] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();

  // modal actions
  const handleAction = (actionKey: string, jobposting: JobPosting) => {
    setJobposting(jobposting);
    if (actionKey === "viewDetails") {
      setOpenJobPostingModal(true);
    } else if (["open", "draft", "closed"].includes(actionKey)) {
      setStatusModal(true);
      setStatus(actionKey);
    } else if (actionKey == "edit") {
      router.push(`/hr/job-postings/${jobposting.id}/edit`);
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
      {/* job posting detail modal  */}
      {jobposting && (
        <JobDetailModal
          openModal={openJobPostingModal}
          setOpenModal={setOpenJobPostingModal}
          jobposting={jobposting}
        />
      )}
      {/* change status modal  */}
      {status && jobposting && (
        <JobPostingStatusModal
          openModal={openStatusModal}
          setOpenModal={setStatusModal}
          jobposting={jobposting}
          status={status}
        />
      )}
    </SidebarLayout>
  );
}
