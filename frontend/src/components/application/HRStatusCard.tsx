import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CheckCircle2Icon } from "lucide-react";

export function HRStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status Timeline</CardTitle>
      </CardHeader>
      <CardContent className="px-8">
        <div>
          <div className="relative pl-6 grid gap-5 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
            {/* Application Submitted */}
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2">
              <div className="grid gap-1">
                <CheckCircle2Icon
                  size={20}
                  className="absolute left-0 translate-x-[-34px] z-10 top-1 text-green-600"
                />
                <div className="text-sm">Application Submitted</div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 min-w-max sm:text-right">
                Apr 10, 2025
              </div>
            </div>

            {/* Application Reviewed */}
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2">
              <div className="grid gap-1">
                <CheckCircle2Icon
                  size={20}
                  className="absolute left-0 translate-x-[-34px] z-10 top-1 text-green-600"
                />
                <div className="text-sm">Application Reviewed</div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 min-w-max sm:text-right">
                Apr 13, 2025
              </div>
            </div>

            {/* Interview Scheduled */}
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2">
              <div className="grid gap-1">
                <CheckCircle2Icon
                  size={20}
                  className="absolute left-0 translate-x-[-34px] z-10 top-1 text-green-600"
                />
                <div className="text-sm">Interview Scheduled</div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 min-w-max sm:text-right">
                Apr 17, 2025
              </div>
            </div>

            {/* Job Offer Extended */}
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2">
              <div className="grid gap-1">
                <CheckCircle2Icon
                  size={20}
                  className="absolute left-0 translate-x-[-34px] z-10 top-1 text-green-600"
                />
                <div className="text-sm">Job Offer Extended</div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 min-w-max sm:text-right">
                Apr 20, 2025
              </div>
            </div>

            {/* Hired */}
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2">
              <div className="grid gap-1">
                <CheckCircle2Icon
                  size={20}
                  className="absolute left-0 translate-x-[-34px] z-10 top-1 text-green-600"
                />
                <div className="text-sm">Applicant Hired</div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 min-w-max sm:text-right">
                Apr 22, 2025
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
