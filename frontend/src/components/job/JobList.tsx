"use client";

import JobCard from "./JobCard";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

interface JobListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  selectedJobId: number;
}

export default function JobList({ jobs, onSelectJob, selectedJobId }: JobListProps) {
  return (
    <div className="space-y-4 h-[calc(100vh-150px)] overflow-y-auto pr-2">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onClick={() => onSelectJob(job)}
          isSelected={job.id === selectedJobId}
        />
      ))}
    </div>
  );
}
