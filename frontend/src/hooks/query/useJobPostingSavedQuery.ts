import { useQuery } from "@tanstack/react-query";
import { useJobPostingApi } from "@/api/jobposting";
import { useSession } from "next-auth/react";

export function useOpenJobPostingsSavedQuery() {
  const { data: session } = useSession();
  const jobPostingWithSavedQueryKey = ["jobpostingsaved", session?.user.applicant_id];
  const { jobPostingWithSaved } = useJobPostingApi();

  return useQuery({
    queryKey: jobPostingWithSavedQueryKey,
    queryFn: jobPostingWithSaved,
  });
}
