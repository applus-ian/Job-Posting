import { useQuery } from "@tanstack/react-query";
import { useJobPostingApi } from "@/api/jobposting";

type JobPostingType = "all" | "open";

export function useJobPostingsQuery(type: JobPostingType = "open") {
  const { allJobPostings, openJobPostings } = useJobPostingApi();

  const jobPostingQuery = type === "all" ? allJobPostings : openJobPostings;

  return useQuery({
    queryKey: [type === "all" ? "all_job_postings" : "open_job_postings"],
    queryFn: jobPostingQuery,
  });
}
