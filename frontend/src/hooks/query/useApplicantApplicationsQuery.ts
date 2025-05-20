import { useQuery } from "@tanstack/react-query";
import { useApplicationApi } from "@/api/application";
import { useSession } from "next-auth/react";

export function useApplicantApplicationsQuery() {
  const { getApplicantApplications } = useApplicationApi();
  const { data: session } = useSession();
  const applicationsQueryKey = ["applications", session?.user.applicant_id];

  return useQuery({
    queryKey: applicationsQueryKey,
    queryFn: getApplicantApplications,
  });
}
