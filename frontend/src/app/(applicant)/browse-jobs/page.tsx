"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import JobSearchBar from "@/components/job/JobSearchBar";
import { useJobPosting } from "@/hooks/useJobPosting";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";
import { useDocument } from "@/hooks/useDocument";

export default function BrowseJobPage() {
  const { getOpenJobPostings } = useJobPosting();
  const { getDefaultFileQuery } = useDocument();
  const {
    data: jobPostingsData,
    isLoading: isJobPostingsLoading,
    isError: isJobPostingsError,
  } = getOpenJobPostings;
  const {
    data: defaultFileData,
    isLoading: isDefaultFileLoading,
    isError: isDefaultFileError,
  } = getDefaultFileQuery;

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
            savedjobs={[]}
          />
        </>
      )}
    </SidebarLayout>
  );
}
