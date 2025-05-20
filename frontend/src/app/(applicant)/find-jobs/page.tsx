"use client";
import HeaderNav from "@/components/homepage/HeaderNav";
import Footer from "@/components/homepage/Footer";
import JobSearchBar from "@/components/job/JobSearchBar";
import { JobBoard } from "@/components/job/JobBoard";
import { SkeletonBrowseJob } from "@/components/skeletons/SkeletonBrowseJob";
import { useOpenJobPostingsQuery } from "@/hooks/query/useJobPostingQuery";

export default function FindJobPage() {
  const { data, isLoading, isError } = useOpenJobPostingsQuery();

  if (isError) return <div>Error loading job postings</div>;
  return (
    <>
      <HeaderNav />
      <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6 p-4 md:p-8">
        <div className="flex w-full flex-col gap-6">
          {isLoading ? (
            <SkeletonBrowseJob />
          ) : (
            <>
              <JobSearchBar />
              <JobBoard jobpostings={data.jobpostings} documents={[]} savedjobs={[]} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
