import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useProfileApi } from "@/api/profile";

export function useProfileQuery() {
  const { applicantDetails } = useProfileApi();
  const { data: session } = useSession();
  const applicantDetailsQueryKey = ["applicant", session?.user.applicant_id];

  return useQuery({
    queryKey: applicantDetailsQueryKey,
    queryFn: applicantDetails,
  });
}
