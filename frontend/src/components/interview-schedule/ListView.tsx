"use client";

import { InterviewTable } from "../tables/interview/InterviewTable";
import { useInterviewColumns } from "../tables/interview/InterviewColumns";
import { Interview } from "@/types/interview";

type ListViewProps = {
  interviews?: Interview[];
};

export function ListView({ interviews }: ListViewProps) {
  const columns = useInterviewColumns();
  console.log("interviews data:", interviews);

  return <InterviewTable columns={columns} data={interviews ?? []} />;
}
