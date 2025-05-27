"use client";
import { useState } from "react";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import JobSearchBar from "@/components/job/JobSearchBar";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";
import { useOpenJobPostingsSavedQuery } from "@/hooks/query/useJobPostingSavedQuery";
import { useDocumentQuery } from "@/hooks/query/useDocumentQuery";

type JobFilters = {
  titleOrTags: string;
  location: string;
  category: string;
};

export default function BrowseJobPage() {
  const [filters, setFilters] = useState<JobFilters>({
    titleOrTags: "",
    location: "",
    category: "",
  });

  const {
    data: jobPostingsData,
    isLoading: isJobPostingsLoading,
    isError: isJobPostingsError,
  } = useOpenJobPostingsSavedQuery();

  const {
    data: defaultFileData,
    isLoading: isDefaultFileLoading,
    isError: isDefaultFileError,
  } = useDocumentQuery();

  if (isJobPostingsError || isDefaultFileError) return <div>Something went wrong</div>;

    // Defensive fallback to empty array for jobpostings & savedjobs
  const jobpostings = jobPostingsData?.jobpostings ?? [];
  const savedjobs = jobPostingsData?.savedjobs ?? [];
  const documents = defaultFileData?.documents ?? [];

  // Filter jobs based on filters state
  const filteredJobPostings = jobpostings.filter((job: any) => {
  const title = typeof job.title === "string" ? job.title.toLowerCase() : "";

  // Fix for tags: tags array contains objects with 'tag' property
  const matchesTitleOrTags =
    filters.titleOrTags === "" ||
    title.includes(filters.titleOrTags.toLowerCase()) ||
    (Array.isArray(job.tags) &&
      job.tags.some(
        (tag: any) =>
          typeof tag.tag === "string" &&
          tag.tag.toLowerCase().includes(filters.titleOrTags.toLowerCase())
      ));

    // Build address string to check location filter
    const addressString = job.address
      ? `${job.address.street ?? ""} ${job.address.city ?? ""} ${job.address.state ?? ""} ${job.address.country ?? ""}`.toLowerCase()
      : "";

    const matchesLocation =
      filters.location === "" || addressString.includes(filters.location.toLowerCase());

    const category = typeof job.category === "string" ? job.category.toLowerCase() : "";

    const matchesCategory =
      filters.category === "" || category.includes(filters.category.toLowerCase());

    return matchesTitleOrTags && matchesLocation && matchesCategory;
  });


  return (
    <SidebarLayout breadcrumbs={[{ label: "Browse Jobs", isCurrentPage: true }]}>
      {isJobPostingsLoading || isDefaultFileLoading ? (
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
