import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSavedJobApi } from "@/api/savedjob";

export function useSavedJobQuery() {
  const { data: session } = useSession();
  const { getSavedJob } = useSavedJobApi();
  const savedJobQueryKey = ["savedjobs", session?.user.applicant_id];

  return useQuery({
    queryKey: savedJobQueryKey,
    queryFn: getSavedJob,
  });
}
