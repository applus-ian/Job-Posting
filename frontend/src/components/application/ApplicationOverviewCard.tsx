import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import CustomBadge from "../badges/CustomBadge";
import { JobAppliedCard } from "../job/JobAppliedCard";
import { ApplicantProfile } from "@/types/profile";
import { JobPosting } from "@/types/job";
import { User } from "lucide-react";
import { Application } from "@/types/application";

export function ApplicationOverviewCard({
  applicant,
  application,
  jobposting,
  fullname,
}: {
  applicant: ApplicantProfile;
  application: Application;
  jobposting: JobPosting;
  fullname: string;
}) {
  const profileBaseUrl = "http://localhost:8000/storage/profile/";
  const profilePath = applicant?.user?.profile ?? "";
  const profileUrl = profilePath ? `${profileBaseUrl}${profilePath}` : "";

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
            </div>
          </div>
          <CustomBadge label={application.status} status={application.status} />
        </div>
        <JobAppliedCard jobposting={jobposting} />
      </CardContent>
    </Card>
  );
}
