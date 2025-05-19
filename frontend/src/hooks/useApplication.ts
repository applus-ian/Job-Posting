import { useApplicationApi } from "@/api/application";
import { useMutation } from "@tanstack/react-query";

export function useApplication() {
  const { applyJob } = useApplicationApi();

  const applyJobMutation = useMutation({
    mutationFn: applyJob,
    onError: (error) => {
      console.error("Something went wrong!", error);
    },
  });

  return { applyJobMutation };
}
