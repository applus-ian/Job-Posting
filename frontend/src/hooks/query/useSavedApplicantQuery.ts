import { useQuery } from "@tanstack/react-query";
import { useSavedApplicantApi } from "@/api/savedapplicant";

export function useSavedApplicantQuery() {
  const { getSavedApplicant } = useSavedApplicantApi();
  const savedJobApplicantKey = ["savedapplicants-table"];

  return useQuery({
    queryKey: savedJobApplicantKey,
    queryFn: getSavedApplicant,
  });
}
