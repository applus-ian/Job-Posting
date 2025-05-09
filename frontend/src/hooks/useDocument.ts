import { useDocumentApi } from "@/api/document";
import { useMutation } from "@tanstack/react-query";

export function useDocument() {
  const { deleteResume, deleteCoverLetter } = useDocumentApi();

  const deleteResumeMutation = useMutation({
    mutationFn: deleteResume,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  const deleteCoverLetterMutation = useMutation({
    mutationFn: deleteCoverLetter,
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return { deleteResumeMutation, deleteCoverLetterMutation };
}
