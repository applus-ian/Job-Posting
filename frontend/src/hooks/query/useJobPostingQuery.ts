import { useQuery } from "@tanstack/react-query";
import { useJobPostingApi } from "@/api/jobposting";

export function useOpenJobPostingsQuery() {
  const { openJobPostings } = useJobPostingApi();

  return useQuery({
    queryKey: ["open_job_postings"],
    queryFn: openJobPostings,
  });
}
