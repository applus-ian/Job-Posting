"use client";

import { useEffect, useState } from "react";
import { InterviewData, sampleInterviewers, useInterviewColumns } from "./sample-data";
import { useRouter } from "next/navigation";
import { ApplicationsTable } from "@/components/tables/applicant-applications/ApplicationsTable";
import {
  useApplicationColumns,
} from "@/components/tables/applicant-applications/ApplicationsColumns";

type Interview = InterviewData;

type ListViewProps = {
  interviews: Interview[];
};

export function ListView({ interviews }: ListViewProps) {
  const columns = useInterviewColumns();
  const [data, setData] = useState<InterviewData[]>([]);
  
    useEffect(() => {
      setData(interviews);
    }, [interviews]);


  return (
    <ApplicationsTable columns={columns} data={data} />
  );
}
