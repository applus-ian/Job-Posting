import { JobAppliedCard } from "../job/JobAppliedCard";
import { DocumentCard } from "./DocumentCard";
import { ApplicantStatusCard } from "./ApplicantStatusCard";
import { Application, ApplicationStatus } from "@/types/application";
import { JobPosting } from "@/types/job";
import { Document } from "@/types/profile";

export function ApplicationDetailCard({
  application,
  applicationstatus,
  jobposting,
  documents,
}: {
  application: Application;
  applicationstatus: ApplicationStatus[];
  jobposting: JobPosting;
  documents: Document[];
}) {
  const applicationStatus = application.status;
  const isBasicStatus = applicationStatus === "received" || applicationStatus === "reviewed";
  return (
    <div className="mt-4">
      {!isBasicStatus && <p className="text-xl">Application Details</p>}
      <div className="flex flex-col lg:flex-row w-full gap-3 mt-4">
        <div className="lg:w-2/3 w-full">
          <ApplicantStatusCard applicationstatus={applicationstatus} />
        </div>
        <div className="flex flex-col lg:w-1/3 w-full gap-3">
          <JobAppliedCard jobposting={jobposting} />
          <DocumentCard documents={documents} />
        </div>
      </div>
    </div>
  );
}
