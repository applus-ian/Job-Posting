"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { JobBoard } from "@/components/job/JobBoard";
import JobSearchBar from "@/components/job/JobSearchBar";
import { useJobPosting } from "@/hooks/useJobPosting";

export default function BrowseJobPage() {
  const { getOpenJobPostings } = useJobPosting();
  const { data, isLoading, isError } = getOpenJobPostings;

  if (isError) return <div>Error loading job postings</div>;

  return (
    <SidebarLayout>
      <JobSearchBar />
      {isLoading ? <>loading</> : <JobBoard jobpostings={data.jobpostings} />}
    </SidebarLayout>
  );
}
