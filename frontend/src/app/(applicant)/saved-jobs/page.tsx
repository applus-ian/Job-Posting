"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import JobSearchBar from "@/components/job/JobSearchBar";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";
import { useSavedJobQuery } from "@/hooks/query/useSavedJobQuery";
import { useDocumentQuery } from "@/hooks/query/useDocumentQuery";

type JobFilters = {
  titleOrTags: string;
  location: string;
  category: string;
};

export default function SavedJobPage() {
  const [filters, setFilters] = useState<JobFilters>({
    titleOrTags: "",
    location: "",
    category: "",
  });

  const {
    data: savedJobData,
    isLoading: isSavedJobLoading,
    isError: isSavedJobError,
  } = useSavedJobQuery();

  const {
    data: defaultFileData,
    isLoading: isDefaultFileLoading,
    isError: isDefaultFileError,
  } = useDocumentQuery();

  if (isSavedJobError || isDefaultFileError) return <div>Error loading job postings</div>;

  const jobpostings = savedJobData?.jobpostings ?? [];
  const savedjobs = savedJobData?.savedjobs ?? [];
  const documents = defaultFileData?.documents ?? [];

  // Filter logic (same as BrowseJobPage)
  const filteredJobPostings = jobpostings.filter((job: any) => {
    const title = typeof job.title === "string" ? job.title.toLowerCase() : "";
    const category = typeof job.category === "string" ? job.category.toLowerCase() : "";

    const matchesTitleOrTags =
      filters.titleOrTags === "" ||
      title.includes(filters.titleOrTags.toLowerCase()) ||
      (Array.isArray(job.tags) &&
        job.tags.some(
          (tag: any) =>
            typeof tag.tag === "string" &&
            tag.tag.toLowerCase().includes(filters.titleOrTags.toLowerCase())
        ));

    const addressString = job.address
      ? `${job.address.street ?? ""} ${job.address.city ?? ""} ${job.address.state ?? ""} ${job.address.country ?? ""}`.toLowerCase()
      : "";

    const matchesLocation =
      filters.location === "" || addressString.includes(filters.location.toLowerCase());

    const matchesCategory =
      filters.category === "" || category.includes(filters.category.toLowerCase());

    return matchesTitleOrTags && matchesLocation && matchesCategory;
  });

  return (
    <SidebarLayout breadcrumbs={[{ label: "Saved Jobs", isCurrentPage: true }]}>
      {isSavedJobLoading || isDefaultFileLoading ? (
        <SkeletonBrowseJob />
      ) : (
        <>
          <JobSearchBar
            onFilterChange={setFilters}
            jobPostings={jobpostings}
          />
          <JobBoard
            jobpostings={filteredJobPostings}
            documents={documents}
            savedjobs={savedjobs}
          />
        </>
      )}
    </SidebarLayout>
  );
}
