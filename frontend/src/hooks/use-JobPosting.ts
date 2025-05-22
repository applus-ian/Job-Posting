"use client";
import { useJobPostingApi } from "@/api/jobposting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export function useJobPosting() {
  const {
    createJobPosting,
  } = useJobPostingApi();
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();

  // create job posting
  const createJobPostingMutation = useMutation({
    mutationFn: createJobPosting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return {
    createJobPostingMutation,
  };
}

