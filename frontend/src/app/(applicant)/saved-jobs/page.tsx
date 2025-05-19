"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";
import JobSearchBar from "@/components/job/JobSearchBar";
import { useDocument } from "@/hooks/useDocument";
import { useSavedJob } from "@/hooks/useSavedJob";

export default function BrowseJobPage() {
  const { getSavedJobQuery } = useSavedJob();
  const { getDefaultFileQuery } = useDocument();
  const {
    data: savedJobData,
    isLoading: isSavedJobLoading,
    isError: isSavedJobError,
  } = getSavedJobQuery;
  const {
    data: defaultFileData,
    isLoading: isDefaultFileLoading,
    isError: isDefaultFileError,
  } = getDefaultFileQuery;

  if (isSavedJobError || isDefaultFileError) return <div>Error loading job postings</div>;

  return (
    <SidebarLayout>
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
