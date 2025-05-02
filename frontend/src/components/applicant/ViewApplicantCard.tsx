import { BioCard } from "./BioCard";
import { ApplicantDetailsCard } from "./ApplicantDetailsCard";
import { EducationHistoryCard } from "./EducationHistoryCard";
import { WorkHistoryCard } from "./WorkHistoryCard";

export function ViewApplicantCard() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <BioCard />
      <ApplicantDetailsCard />
      <EducationHistoryCard />
      <WorkHistoryCard />
    </div>
  );
}
