"use client";
import { useSavedJobApi } from "@/api/savedjob";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export function useSavedJob() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const savedJobQueryKey = ["savedjobs", session?.user.applicant_id];
  const { getSavedJob, saveJobPosting, unsaveJobPosting } = useSavedJobApi();

  const getSavedJobQuery = useQuery({
    queryKey: savedJobQueryKey,
    queryFn: getSavedJob,
  });

  const saveJobPostingMutation = useMutation({
    mutationFn: saveJobPosting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedJobQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  const unsaveJobPostingMutation = useMutation({
    mutationFn: unsaveJobPosting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedJobQueryKey });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return { getSavedJobQuery, saveJobPostingMutation, unsaveJobPostingMutation };
}
