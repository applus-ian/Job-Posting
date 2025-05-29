import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import CustomBadge from "../badges/CustomBadge";
import { MapPin } from "lucide-react";
import { Application } from "@/types/application";
import Link from "next/link";
import { formatDateTime } from "@/utils/dateFormatter";

export function ApplicationCard({ applications }: { applications: Application[] }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Recently Applied</h2>
        <Link
          href="/my-applications"
          className="flex items-center text-sm text-orange-500 hover:underline font-medium"
        >
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-4">
        {applications.map((app) => {
          const job = app.job_posting;
          return (
            <Card key={app.id} className="shadow-sm border border-gray-200 p-2">
              <CardContent className="p-4 relative h-full flex flex-col justify-between">
                {/* Title + Status */}
                <div className="flex flex-wrap items-center justify-between gap-0">
                  <div className="flex flex-row justify-between w-full gap-4">
                    <div className="w-[80%]">
                      <Link
                        href={`/my-applications/${app.id}`}
                        passHref
                        className="hover:text-orange-600 transition-colors text-base font-semibold mb-2"
                      >
                        {job.title}
                      </Link>
                    </div>
                    <div className="w-auto">
                      <CustomBadge label={app.status} status={app.status} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <CustomBadge label={job.category} status="tag" />
                    <CustomBadge label={job.employment_type} status="tag" />
                  </div>
                </div>

                {/* Location & Salary */}
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.work_setup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      {job.salary_type === "monthly" &&
                        `₱${job.salary_min} - ₱${job.salary_max} / mo`}
                      {job.salary_type === "hourly" &&
                        `₱${job.salary_min} - ₱${job.salary_max} / hr`}
                      {job.salary_type === "annually" &&
                        `₱${job.salary_min} - ₱${job.salary_max} / yr`}
                    </span>
                  </div>
                </div>

                {/* Date Applied */}
                <div className="mt-4 flex justify-between items-center text-muted-foreground">
                  <p className="italic text-xs">
                    Applied at: {formatDateTime(app.created_at ?? "")}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
