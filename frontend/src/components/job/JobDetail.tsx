"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, UserPlus2, Loader2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import CustomBadge from "../badges/CustomBadge";
import { JobPosting } from "@/types/job";
import { DescriptionRenderer } from "./DescriptionRenderer";
import { useState } from "react";
import { ApplyJobModal } from "../application/ApplyJobModal";
import { useSession, signIn} from "next-auth/react";
import { Document } from "@/types/profile";
import { useSavedJob } from "@/hooks/useSavedJob";
import { SavedJob } from "@/types/savedjob";
import { useEffect } from "react";

export default function JobDetail({
  jobposting,
  documents,
  savedjobs,
}: {
  jobposting: JobPosting;
  documents: Document[] | null;
  savedjobs: SavedJob[] | null;
}) {
  const { saveJobPostingMutation, unsaveJobPostingMutation } = useSavedJob();
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const job = savedjobs?.find(
    (job) =>
      job.job_posting_id === jobposting.id &&
      job.applicant_id === session?.user.applicant_id
  );
  const [savedJob, setSavedJob] = useState<SavedJob | null>(job ?? null);

  // ✅ Sync savedJob state whenever dependencies change
  useEffect(() => {
    if (session && savedjobs) {
      const matched = savedjobs.find(
        (job) =>
          job.job_posting_id === jobposting.id &&
          job.applicant_id === session.user.applicant_id
      );
      setSavedJob(matched ?? null);
    }
  }, [savedjobs, jobposting.id, session]);

  const handleApplyBtn = (jobposting: JobPosting) => {
    if (session) {
      if (jobposting.vacancies <= 0) {
        alert("Sorry, no vacancies available for this job.");
        return;
      }
      const userAlreadyApplied = jobposting.applications!.some(
        (app) => app.applicant_id === session.user.applicant_id
      );
      if (!userAlreadyApplied) {
        setOpenModal(true);
      } else {
        alert("You have already applied to this job.");
      }
    } else {
      signIn();
    }
  };

  const handleSaveButton = async () => {
  if (!session) {
    signIn();
    return;
  }

  try {
    if (savedJob) {
      await unsaveJobPostingMutation.mutateAsync(savedJob.id!);
      setSavedJob(null);
    } else {
      const response = await saveJobPostingMutation.mutateAsync(jobposting.id!);

      // handle null if already saved in backend (shouldn’t happen in UI, but still safe)
      if (response?.savedjob) {
        setSavedJob(response.savedjob);
      } else {
        console.warn("Job was already saved in backend.");
      }
    }
  } catch (err) {
    console.error("Failed to save/unsave job:", err);
  }
};


  const isLoading = saveJobPostingMutation.isPending || unsaveJobPostingMutation.isPending;

  return (
    <>
      <Card className="h-auto">
        <CardHeader className="pb-1">
          <div className="flex flex-row items-start w-full gap-8">
            <div className="w-[80%]">
              <CardTitle className="text-lg">{jobposting.title}</CardTitle>
            </div>
            <div className="w-auto flex flex-row gap-2">
              {isLoading ? (
                <Loader2 className="w-8 h-8 mt-1 text-primary animate-spin" />
              ) : (
                <Bookmark
                  className={`w-8 h-8 text-primary mt-1 cursor-pointer ${savedJob ? "fill-primary" : ""} ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                  strokeWidth={1}
                  onClick={() => handleSaveButton()}
                />
              )}
              <Button className="md:w-auto" onClick={() => handleApplyBtn(jobposting)}>
                Apply <span className="hidden sm:flex">Now</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <CustomBadge label={jobposting.work_setup} status="tag" />
            <CustomBadge label={jobposting.employment_type} status="tag" />
          </div>
          <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-500">
            {jobposting.applications && jobposting.applications.length > 0 && (
              <div className="flex items-center">
                <UsersRound className="h-4 w-4 mr-2" />
                <span>
                  {jobposting.applications.length}{" "}
                  {jobposting.applications.length === 1 ? "Applicant" : "Applicants"}
                </span>
              </div>
            )}

            <div className="flex items-center">
              <UserPlus2 className="h-4 w-4 mr-2" />
              <span>
                {jobposting.vacancies} {jobposting.vacancies === 1 ? "Vacant" : "Vacants"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto space-y-6 px-6">
          <div>
            <DescriptionRenderer description={jobposting.description} />
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2">Tags</h3>
            {jobposting.tags && jobposting.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {jobposting.tags.map((jobtag, index) => (
                  <CustomBadge key={index} label={jobtag.tag} status="tag" />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ApplyJobModal
        jobposting={jobposting}
        documents={documents ?? []}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
