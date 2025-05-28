import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, BriefcaseIcon, PhilippinePeso } from "lucide-react";
import CustomBadge from "../badges/CustomBadge";
import { JobPosting } from "@/types/job";
import { format } from "date-fns";

export default function JobCard({jobposting} : {jobposting: JobPosting}) {
  
  return (
    <div className="w-full flex flex-col mt-6">
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="text-xl font-md">{jobposting.title}</h3>
                <div className="flex flex-wrap gap-2 ms-0 sm:ms-6">
                  <CustomBadge label={jobposting.employment_type} status="tag" />
                  <CustomBadge label={jobposting.work_setup} status="tag" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <PhilippinePeso className="h-4 w-4" />
                  <span>{jobposting.salary_min} - {jobposting.salary_max}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BriefcaseIcon className="h-4 w-4 ms-0 sm:ms-4" />
                  <span>{jobposting.employment_level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4 ms-0 sm:ms-4" />
                  <span>
                    {jobposting.created_at
                      ? format(new Date(jobposting.created_at), "MMMM d, yyyy")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full sm:w-auto">View Job</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
