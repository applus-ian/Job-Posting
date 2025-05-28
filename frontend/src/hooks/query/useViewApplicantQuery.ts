import { useQuery } from "@tanstack/react-query";
import { useApplicationApi } from "@/api/application";
import { useParams } from "next/navigation";

export function useViewApplicantQuery() {
  const params = useParams();
  const id = params.applicantId;

  const { getApplicantDetails } = useApplicationApi();
  const applicantDetailQueryKey = ["applicant", id];

  return useQuery({
    queryKey: applicantDetailQueryKey,
    queryFn: () => getApplicantDetails(Number(id)),
  });
}
