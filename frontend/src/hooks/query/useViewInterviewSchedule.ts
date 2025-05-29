import { useQuery } from "@tanstack/react-query";
import { useInterviewApi } from "@/api/interview";

export function useViewInterviewSchedule() {
  const { allInterviews } = useInterviewApi();

  return useQuery({
    queryKey: ["allInterviews"],
    queryFn: () => allInterviews(),
  });
}