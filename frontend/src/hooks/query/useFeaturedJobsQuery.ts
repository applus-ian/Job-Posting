import { useQuery } from "@tanstack/react-query";
import { useJobPostingApi } from "@/api/jobposting";

export function useFeaturedJobsQuery() {
  const { getFeaturedJobs } = useJobPostingApi();

  return useQuery({
    queryKey: ["featuredjobs"],
    queryFn: getFeaturedJobs,
  });
}
