"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";
import JobSearchBar from "@/components/job/JobSearchBar";
import { useSavedJobQuery } from "@/hooks/query/useSavedJobQuery";
import { useDocumentQuery } from "@/hooks/query/useDocumentQuery";

export default function BrowseJobPage() {
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

  return (
    <SidebarLayout breadcrumbs={[{ label: "Saved Jobs", isCurrentPage: true }]}>
      {isSavedJobLoading || isDefaultFileLoading ? (
        <SkeletonBrowseJob />
      ) : (
        <>
          <JobSearchBar />
          <JobBoard
            jobpostings={savedJobData.jobpostings}
            documents={defaultFileData.documents}
            savedjobs={savedJobData.savedjobs}
          />
        </>
      )}
    </SidebarLayout>
  );
}
