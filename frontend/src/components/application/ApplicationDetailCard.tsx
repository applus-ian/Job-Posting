import { JobAppliedCard } from "../job/JobAppliedCard";
import { DocumentCard } from "./DocumentCard";
import { ApplicationStatusCard } from "./ApplicationStatusCard";

export function ApplicationDetailCard() {
  return (
    <div className="mt-6">
      <p className="text-xl">Application Details</p>
      <div className="flex flex-col-reverse lg:flex-row w-full gap-6 mt-4">
        <div className="flex flex-col lg:w-1/3 w-full gap-4">
          <JobAppliedCard />
          <DocumentCard />
        </div>
        <div className="lg:w-2/3 w-full">
          <ApplicationStatusCard />
        </div>
      </div>
    </div>
  );
}
