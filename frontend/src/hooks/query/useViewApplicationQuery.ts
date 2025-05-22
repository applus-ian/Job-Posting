import { useQuery } from "@tanstack/react-query";
import { useApplicationApi } from "@/api/application";
import { useParams } from "next/navigation";

export function useViewApplicationQuery() {
  const params = useParams();
  const id = params.applicationId;

  const { getApplicationDetails } = useApplicationApi();
  const applicationDetailQueryKey = ["application", id];

  return useQuery({
    queryKey: applicationDetailQueryKey,
    queryFn: () => getApplicationDetails(Number(id)),
  });
}
