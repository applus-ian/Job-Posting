import { ApplicationStatus } from "@/types/application";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CheckCircle2Icon } from "lucide-react";
import { formatDateOnly } from "@/utils/dateFormatter";

const statusDetails: Record<ApplicationStatus["status"], { title: string; description: string }> = {
  received: {
    title: "Application Submitted",
    description:
      "Your application has been successfully submitted and is now waiting to be reviewed by the employer.",
  },
  reviewed: {
    title: "Application Reviewed",
    description:
      "The employer has reviewed your application. You may be shortlisted for the next steps.",
  },
  interview: {
    title: "Interview Scheduled",
    description:
      "You've been selected for an interview. Prepare well and make a strong impression.",
  },
  offer: {
    title: "Job Offer Extended",
    description:
      "Congratulations! You've received a job offer. Review the offer details and respond accordingly.",
  },
  hired: {
    title: "You're Hired!",
    description:
      "The hiring team has marked your application as hired. Further onboarding instructions will be provided by HR.",
  },
  rejected: {
    title: "Application Rejected",
    description:
      "We appreciate your interest, but the employer has decided not to move forward with your application at this time.",
  },
};

export function ApplicantStatusCard({
  applicationstatus,
}: {
  applicationstatus: ApplicationStatus[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent className="px-8">
        <div>
          <div className="relative pl-6 grid gap-10 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
            {applicationstatus.map((statusItem) => {
              const { status, created_at, id } = statusItem;
              const statusInfo = statusDetails[status];
              return (
                <div
                  key={id}
                  className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2"
                >
                  <div className="grid gap-1">
                    <CheckCircle2Icon
                      size={20}
                      className="absolute left-0 translate-x-[-34px] z-10 top-1 text-green-600"
                    />
                    <div className="text-sm font-medium">{statusInfo.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {statusInfo.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 min-w-max sm:text-right">
                    {formatDateOnly(created_at)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
