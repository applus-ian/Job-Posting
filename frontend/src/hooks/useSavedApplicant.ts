import { useSavedApplicantApi } from "@/api/savedapplicant";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useSavedApplicant() {
  const queryClient = useQueryClient();
  const { saveApplicant, unsaveApplicant, unsaveApplicantMultiple } = useSavedApplicantApi();
  const savedApplicantQueryKey = ["savedapplicants"];
  const savedApplicantTableQueryKey = ["savedapplicants-table"];

  const saveApplicantMutation = useMutation({
    mutationFn: saveApplicant,
    onSuccess: () => {
      [savedApplicantQueryKey, savedApplicantTableQueryKey].forEach((key) =>
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
      [savedApplicantQueryKey, savedApplicantTableQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const unsaveApplicantMultipleMutation = useMutation({
    mutationFn: unsaveApplicantMultiple,
    onSuccess: () => {
      [savedApplicantQueryKey, savedApplicantTableQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return { saveApplicantMutation, unsaveApplicantMutation, unsaveApplicantMultipleMutation };
}
