import { useApplicationApi } from "@/api/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export function useApplication() {
  const { applyJob } = useApplicationApi();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const jobPostingWithSavedQueryKey = ["jobpostingsaved", session?.user.applicant_id];

  const applyJobMutation = useMutation({
    mutationFn: applyJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: jobPostingWithSavedQueryKey });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return { applyJobMutation };
}
