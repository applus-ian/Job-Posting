import { useQuery } from "@tanstack/react-query";
import { useDocumentApi } from "@/api/document";
import { useSession } from "next-auth/react";

export function useDocumentQuery() {
  const { getDefaultFiles } = useDocumentApi();
  const { data: session } = useSession();
  const defaultFileQueryKey = ["document", session?.user.applicant_id];

  return useQuery({
    queryKey: defaultFileQueryKey,
    queryFn: getDefaultFiles,
  });
}
