import { useJobPostingApi } from "@/api/jobposting";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useJobPosting() {
  const { createJobPosting } = useJobPostingApi();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createJobPostingMutation = useMutation({
    mutationFn: createJobPosting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["open_job_postings"] });
      queryClient.invalidateQueries({ queryKey: ["all_job_postings"] });
      router.push("/hr/job-postings");
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });

  return { createJobPostingMutation };
}
