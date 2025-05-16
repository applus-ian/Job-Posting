"use client";

import { JobListProps } from "@/types/job";
import JobCard from "./JobCard";

export default function JobList({ jobpostings, onSelectJob, selectedJobId }: JobListProps) {
  return (
    <div className="space-y-4 h-[calc(100vh-150px)] overflow-y-auto pr-2">
      {jobpostings.map((jobposting) => (
        <JobCard
          key={jobposting.id}
          jobposting={jobposting}
          onClick={() => onSelectJob(jobposting)}
          isSelected={jobposting.id === selectedJobId}
        />
      ))}
    </div>
  );
}
