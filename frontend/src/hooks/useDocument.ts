import { useDocumentApi } from "@/api/document";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export function useDocument() {
  const { data: session } = useSession();
  const { deleteResume, deleteCoverLetter } = useDocumentApi();
  const queryClient = useQueryClient();
  const applicantDetailsQueryKey = ["applicant", session?.user.applicant_id];
  const defaultFileQueryKey = ["document", session?.user.applicant_id];

  const deleteResumeMutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      [applicantDetailsQueryKey, defaultFileQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      toast.success("Resume file deleted!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const deleteCoverLetterMutation = useMutation({
    mutationFn: deleteCoverLetter,
    onSuccess: () => {
      [applicantDetailsQueryKey, defaultFileQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      toast.success("Coverletter file deleted!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return { deleteResumeMutation, deleteCoverLetterMutation };
}
