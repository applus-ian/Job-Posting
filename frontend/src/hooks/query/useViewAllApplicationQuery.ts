import { useQuery } from "@tanstack/react-query";
import { useApplicationApi } from "@/api/application";

export function useViewAllApplicationQuery() {
  const { getAllApplication } = useApplicationApi();
  const allApplicationDetailQueryKey = ["all-application"];

  return useQuery({
    queryKey: allApplicationDetailQueryKey,
    queryFn: () => getAllApplication(),
  });
}
