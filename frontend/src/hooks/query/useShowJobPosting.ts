import { useQuery } from "@tanstack/react-query";
import { useJobPostingApi } from "@/api/jobposting";
import { useParams } from "next/navigation";

export function useShowJobPosting() {
  const params = useParams();
  const id = params.id;

  const { getJobPosting } = useJobPostingApi();
  const jobPostingQueryKey = ["jobposting", id];

  return useQuery({
    queryKey: jobPostingQueryKey,
    queryFn: () => getJobPosting(Number(id)),
  });
}
