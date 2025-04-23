import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CheckCircle2Icon } from "lucide-react";

export function ApplicationStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent className="px-8">
        <div>
          <div className="relative pl-6 grid gap-10 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
            {/* Application Submitted */}
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between text-sm gap-2">
              <div className="grid gap-1">
                <CheckCircle2Icon
                  size={20}
                  className="absolute left-0 translate-x-[-34px] z-10 top-1 text-green-600"
                />
                <div className="text-sm font-medium">Application Submitted</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Your application has been successfully submitted and is now waiting to be reviewed
                  by the employer.
                </div>
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
                <div className="text-sm font-medium">Application Reviewed</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  The employer has reviewed your application. You may be shortlisted for the next
                  steps.
                </div>
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
                <div className="text-sm font-medium">Interview Scheduled</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  You&apos;ve been selected for an interview. Prepare well and make a strong
                  impression.
                </div>
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
                <div className="text-sm font-medium">Job Offer Extended</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Congratulations! You&apos;ve received a job offer. Review the offer details and
                  respond accordingly.
                </div>
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
                <div className="text-sm font-medium">You&apos;re Hired!</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  The hiring team has marked your application as hired. Further onboarding
                  instructions will be provided by HR.
                </div>
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
