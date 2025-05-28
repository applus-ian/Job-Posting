import { ApplicationStatus } from "@/types/application";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CheckCircle2Icon } from "lucide-react";
import { formatDateTime } from "@/utils/dateFormatter";

const statusDetails: Record<ApplicationStatus["status"], { title: string }> = {
  received: {
    title: "Application Received",
  },
  reviewed: {
    title: "Application Reviewed",
  },
  interview: {
    title: "Interview Scheduled",
  },
  offer: {
    title: "Job Offer Extended",
  },
  hired: {
    title: "Candidate Hired",
  },
};

export function HRStatusCard({ applicationstatus }: { applicationstatus: ApplicationStatus[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status Timeline</CardTitle>
      </CardHeader>
      <CardContent className="px-8">
        <div>
          <div className="relative pl-6 grid gap-5 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
            {applicationstatus.map((statusItem) => {
              const { id, status, created_at } = statusItem;
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
                    <div className="text-sm">{statusInfo.title}</div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 min-w-max sm:text-right">
                    {formatDateTime(created_at)}
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
