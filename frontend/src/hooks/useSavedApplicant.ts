import { useSavedApplicantApi } from "@/api/savedapplicant";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useSavedApplicant(applicationId: number) {
  const queryClient = useQueryClient();
  const { saveApplicant, unsaveApplicant } = useSavedApplicantApi();
  const savedApplicantQueryKey = ["savedapplicants"];
  const applicationDetailQueryKey = ["application", applicationId];

  const saveApplicantMutation = useMutation({
    mutationFn: saveApplicant,
    onSuccess: () => {
      [savedApplicantQueryKey, applicationDetailQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const unsaveApplicantMutation = useMutation({
    mutationFn: unsaveApplicant,
    onSuccess: () => {
      [savedApplicantQueryKey, applicationDetailQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return { saveApplicantMutation, unsaveApplicantMutation };
}
