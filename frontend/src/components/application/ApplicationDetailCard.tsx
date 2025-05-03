import { JobAppliedCard } from "../job/JobAppliedCard";
import { DocumentCard } from "./DocumentCard";
import { ApplicantStatusCard } from "./ApplicantStatusCard";

export function ApplicationDetailCard() {
  return (
    <div className="mt-6">
      <p className="text-xl">Application Details</p>
      <div className="flex flex-col lg:flex-row w-full gap-6 mt-4">
        <div className="lg:w-2/3 w-full">
          <ApplicantStatusCard />
        </div>
        <div className="flex flex-col lg:w-1/3 w-full gap-6">
          <JobAppliedCard />
          <DocumentCard />
        </div>
      </div>
    </div>
  );
}
