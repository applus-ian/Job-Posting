"use client";
import { useSavedJobApi } from "@/api/savedjob";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export function useSavedJob() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { saveJobPosting, unsaveJobPosting } = useSavedJobApi();
  const savedJobQueryKey = ["savedjobs", session?.user.applicant_id];
  const jobPostingWithSavedQueryKey = ["jobpostingsaved", session?.user.applicant_id];

  const saveJobPostingMutation = useMutation({
    mutationFn: saveJobPosting,
    onSuccess: () => {
      [savedJobQueryKey, jobPostingWithSavedQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  const unsaveJobPostingMutation = useMutation({
    mutationFn: unsaveJobPosting,
    onSuccess: () => {
      [savedJobQueryKey, jobPostingWithSavedQueryKey].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return { saveJobPostingMutation, unsaveJobPostingMutation };
}
