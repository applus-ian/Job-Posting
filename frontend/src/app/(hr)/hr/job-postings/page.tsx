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
  const [selectedJobPosting, setSelectedJobPosting] = useState<JobPosting | null>(null);
  const [openJobPostingModal, setOpenJobPostingModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [status, setStatus] = useState<"open" | "draft" | "closed" | "">("");
  const router = useRouter();

  // modal action handler
  const handleAction = (actionKey: string, jobPosting: JobPosting) => {
    setSelectedJobPosting(jobPosting);

    if (actionKey === "viewDetails") {
      setOpenJobPostingModal(true);
    } else if (["open", "draft", "closed"].includes(actionKey)) {
      setStatus(actionKey as "open" | "draft" | "closed");
      setOpenStatusModal(true);
    } else if (actionKey === "edit") {
      router.push(`/hr/job-postings/${jobPosting.id}/edit`);
    }
  };

  const { data, isLoading } = useJobPostingsQuery("all");
  const columns = jobPostingColumn({ handleAction });

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

      {/* Job Detail Modal */}
      {selectedJobPosting && (
        <JobDetailModal
          openModal={openJobPostingModal}
          setOpenModal={setOpenJobPostingModal}
          jobposting={selectedJobPosting}
        />
      )}

      {/* Change Status Modal */}
      {status && selectedJobPosting && (
        <JobPostingStatusModal
          openModal={openStatusModal}
          setOpenModal={setOpenStatusModal}
          jobposting={selectedJobPosting}
          status={status}
        />
      )}
    </SidebarLayout>
  );
}
