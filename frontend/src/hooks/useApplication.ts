import { useApplicationApi } from "@/api/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useApplication() {
  const { applyJob } = useApplicationApi();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const jobPostingWithSavedQueryKey = ["jobpostingsaved", session?.user.applicant_id];

  const applyJobMutation = useMutation({
    mutationFn: applyJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobPostingWithSavedQueryKey });
    },
    onError: (error) => {
      console.error("Something went wrong!", error);
    },
  });

  return { applyJobMutation };
}
