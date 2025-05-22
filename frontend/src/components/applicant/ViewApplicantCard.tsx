import { BioCard } from "./BioCard";
import { ApplicantDetailsCard } from "./ApplicantDetailsCard";
import { EducationHistoryCard } from "./EducationHistoryCard";
import { WorkHistoryCard } from "./WorkHistoryCard";
import { ApplicantProfile } from "@/types/profile";

export function ViewApplicantCard({ applicant }: { applicant: ApplicantProfile }) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {applicant.biography && <BioCard bio={applicant.biography} />}
      <ApplicantDetailsCard
        applicant={applicant}
        emergencycontact={applicant.emergency_contact}
        language={applicant.language}
      />
      <EducationHistoryCard educationhistory={applicant.education_history} />
      <WorkHistoryCard workexperience={applicant.work_experience} />
    </div>
  );
}
