import { useApplicationApi } from "@/api/application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useViewApplicationQuery } from "./query/useViewApplicationQuery";

export function useApplication() {
  const { applyJob, updateApplicationStatus } = useApplicationApi();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const jobPostingWithSavedQueryKey = ["jobpostingsaved", session?.user.applicant_id];
  const { refetch } = useViewApplicationQuery();
  const router = useRouter();

  const applyJobMutation = useMutation({
    mutationFn: applyJob,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: jobPostingWithSavedQueryKey });
      toast.success(data.message);
      router.push(`/my-applications/${data.application.id}`);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const updateApplicationStatusMutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: (data) => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["application", data.application.id] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return { applyJobMutation, updateApplicationStatusMutation };
}
