import { useJobPostingApi } from "@/api/jobposting";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useJobPosting() {
  const { createJobPosting, updateJobPosting, updateJobPostingStatus } = useJobPostingApi();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createJobPostingMutation = useMutation({
    mutationFn: createJobPosting,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["open_job_postings"] });
      queryClient.invalidateQueries({ queryKey: ["all_job_postings"] });
      router.push("/hr/job-postings");
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const updateJobPostingMutation = useMutation({
    mutationFn: updateJobPosting,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["open_job_postings"] });
      queryClient.invalidateQueries({ queryKey: ["all_job_postings"] });
      router.push("/hr/job-postings");
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Something went wrong! ${error}`);
    },
  });

  const updateJobPostingStatusMutation = useMutation({
    mutationFn: updateJobPostingStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["open_job_postings"] });
      queryClient.invalidateQueries({ queryKey: ["all_job_postings"] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Something went wrong! ${error}`);
    },
  });

  return { createJobPostingMutation, updateJobPostingMutation, updateJobPostingStatusMutation };
}
