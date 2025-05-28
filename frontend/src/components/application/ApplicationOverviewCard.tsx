"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import CustomBadge from "../badges/CustomBadge";
import { JobAppliedCard } from "../job/JobAppliedCard";
import { ApplicantProfile } from "@/types/profile";
import { JobPosting } from "@/types/job";
import { Bookmark, Loader2, User } from "lucide-react";
import { Application } from "@/types/application";
import { signIn, useSession } from "next-auth/react";
import { useSavedApplicant } from "@/hooks/useSavedApplicant";
import { useState } from "react";

export function ApplicationOverviewCard({
  applicant,
  application,
  jobposting,
  fullname,
  is_saved,
  saved_applicant_id,
}: {
  applicant: ApplicantProfile;
  application: Application;
  jobposting: JobPosting;
  fullname: string;
  is_saved: boolean;
  saved_applicant_id: number;
}) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(is_saved);
  const [savedApplicantId, setSavedApplicantId] = useState(saved_applicant_id);
  const { saveApplicantMutation, unsaveApplicantMutation } = useSavedApplicant(applicant.id!);
  const profileBaseUrl = "http://localhost:8000/storage/profile/";
  const profilePath = applicant?.user?.profile ?? "";
  const profileUrl = profilePath ? `${profileBaseUrl}${profilePath}` : "";

  const handleSaveButton = async () => {
    if (session) {
      if (saved) {
        await unsaveApplicantMutation.mutateAsync(savedApplicantId!);
        setSaved(false);
        setSavedApplicantId(0);
      } else {
        const response = await saveApplicantMutation.mutateAsync({
          applicantId: applicant.id!,
          jobpostingId: jobposting.id!,
        });
        setSaved(true);
        setSavedApplicantId(response.savedapplicant.id);
      }
    } else {
      signIn();
    }
  };

  const isLoading = saveApplicantMutation.isPending || unsaveApplicantMutation.isPending;

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 rounded-full">
              <AvatarImage src={profileUrl} alt="@profile" className="rounded-full object-cover" />
              <AvatarFallback className="bg-muted">
                <User className="rounded-lg text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h6 className="text-lg font-semibold">{fullname}</h6>
              <p className="text-xs">{applicant.user?.email}</p>
              <p className="text-xs">{applicant.phone_number}</p>

              <CustomBadge label={application.status} status={application.status} />
            </div>
          </div>

          {isLoading ? (
            <Loader2 className="w-8 h-8 mt-1 text-primary animate-spin" />
          ) : (
            <Bookmark
              className={`w-8 h-8 text-primary mt-1 cursor-pointer ${saved ? "fill-primary" : ""}`}
              strokeWidth={1}
              onClick={() => handleSaveButton()}
            />
          )}
        </div>
        <JobAppliedCard jobposting={jobposting} />
      </CardContent>
    </Card>
  );
}
