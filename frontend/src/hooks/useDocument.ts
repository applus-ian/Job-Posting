import { useDocumentApi } from "@/api/document";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useDocument() {
  const { data: session } = useSession();
  const { getDefaultFiles, deleteResume, deleteCoverLetter } = useDocumentApi();
  const queryClient = useQueryClient();
  const applicantDetailsQueryKey = ["applicant", session?.user.applicant_id];
  const defaultFileQueryKey = ["document", session?.user.applicant_id];

  const getDefaultFileQuery = useQuery({
    queryKey: defaultFileQueryKey,
    queryFn: getDefaultFiles,
  });

  const deleteResumeMutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  const deleteCoverLetterMutation = useMutation({
    mutationFn: deleteCoverLetter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantDetailsQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return { getDefaultFileQuery, deleteResumeMutation, deleteCoverLetterMutation };
}
