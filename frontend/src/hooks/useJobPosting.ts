import { openJobPostings } from "@/api/jobposting";
import { useQuery } from "@tanstack/react-query";

export function useJobPosting() {
  const getOpenJobPostings = useQuery({
    queryKey: ["open_job_postings"],
    queryFn: openJobPostings,
  });

  return { getOpenJobPostings };
}
