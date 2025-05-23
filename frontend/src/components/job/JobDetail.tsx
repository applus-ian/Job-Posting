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
import { useSession, signIn } from "next-auth/react";
import { Document } from "@/types/profile";
import { useSavedJob } from "@/hooks/useSavedJob";
import { SavedJob } from "@/types/savedjob";

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

  const isSaved = savedjobs?.find((saved) => saved.job_posting_id === jobposting.id);

  savedjobs?.map((saved) => {
    console.log("Saved Job:", saved);
    console.log("Saved Job Posting ID:", saved.job_posting_id);
  });

  const handleApplyBtn = (jobposting: JobPosting) => {
    if (session) {
      if (jobposting.vacancies <= 0) {
        alert("Sorry, no vacancies available for this job.");
        return;
      }
      const userAlreadyApplied = jobposting.applications.some(
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

  const handleSaveButton = async (jobPostingId: number) => {
    const savedJob = savedjobs?.find((job) => job.job_posting_id === jobPostingId);

    if (session) {
      if (savedJob) {
        await unsaveJobPostingMutation.mutateAsync(savedJob.id!);
      } else {
        await saveJobPostingMutation.mutateAsync(jobPostingId);
      }
    } else {
      signIn();
    }
  };

  const isLoading = saveJobPostingMutation.isPending || unsaveJobPostingMutation.isPending;

  return (
    <>
      <Card className="h-full">
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
                  className={`w-8 h-8 text-primary mt-1 cursor-pointer ${isSaved ? "fill-primary" : ""}`}
                  strokeWidth={1}
                  onClick={() => handleSaveButton(jobposting.id!)}
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
