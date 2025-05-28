"use client";

import { useState } from "react";
import JobList from "./JobList";
import JobDetail from "./JobDetail";
import { useJobBoardMobile } from "@/hooks/use-jobboard-mobile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { JobPosting } from "@/types/job";
import { Document } from "@/types/profile";
import { SavedJob } from "@/types/savedjob";

export function JobBoard({
  jobpostings,
  documents,
  savedjobs,
}: {
  jobpostings: JobPosting[];
  documents: Document[] | null;
  savedjobs: SavedJob[] | null;
}) {
  const [selectedJob, setSelectedJob] = useState(jobpostings.length > 0 ? jobpostings[0] : null);
  const [showDetail, setShowDetail] = useState(false);
  const isMobile = useJobBoardMobile();

  const handleSelectJob = (jobposting: JobPosting) => {
    setSelectedJob(jobposting);
    if (isMobile) {
      setShowDetail(true);
    }
  };

  const handleBackToList = () => {
    setShowDetail(false);
  };

  if (isMobile && showDetail) {
    return (
      <div>
        {jobpostings.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          <div className="w-full h-80">
            <Button variant="ghost" onClick={handleBackToList} className="mb-4 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to jobs
            </Button>
            {selectedJob && (
              <JobDetail
                jobposting={selectedJob}
                documents={documents ?? []}
                savedjobs={savedjobs ?? []}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {jobpostings.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-2/5">
            <div className="h-auto max-h-130 flex-grow overflow-y-auto">
              <JobList
                jobpostings={jobpostings}
                onSelectJob={handleSelectJob}
                selectedJobId={selectedJob?.id}
              />
            </div>
          </div>
          <div className="max-h-[100vh] w-full lg:w-3/5 hidden lg:block">
            {selectedJob && (
              <JobDetail
                jobposting={selectedJob}
                documents={documents ?? []}
                savedjobs={savedjobs ?? []}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
