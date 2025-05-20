"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import JobSearchBar from "@/components/job/JobSearchBar";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";
import { useOpenJobPostingsSavedQuery } from "@/hooks/query/useJobPostingSavedQuery";
import { useDocumentQuery } from "@/hooks/query/useDocumentQuery";

export default function BrowseJobPage() {
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

  return (
    <SidebarLayout>
      {isJobPostingsLoading || isDefaultFileLoading ? (
        <SkeletonBrowseJob />
      ) : (
        <>
          <JobSearchBar />
          <JobBoard
            jobpostings={jobPostingsData.jobpostings}
            documents={defaultFileData.documents}
            savedjobs={jobPostingsData.savedjobs}
          />
        </>
      )}
    </SidebarLayout>
  );
}
