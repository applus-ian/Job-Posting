import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, BriefcaseIcon, DollarSignIcon } from "lucide-react";
import CustomBadge from "../job/CustomBadge";

export default function JobCard() {
  const title = "Frontend Developer";
  const badgeText = "Full-Time";
  const salary = "$60,000 - $80,000";
  const employmentType = "Remote";
  const expirationDate = "April 30, 2025";

  return (
    <div className="w-full flex flex-col mt-6">
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="text-xl font-md">{title}</h3>
                <div className="flex flex-wrap gap-2 ms-0 sm:ms-6">
                  <CustomBadge label={badgeText} status="tag" />
                  <CustomBadge label={employmentType} status="tag" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>{salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BriefcaseIcon className="h-4 w-4 ms-0 sm:ms-4" />
                  <span>{employmentType}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4 ms-0 sm:ms-4" />
                  <span>{expirationDate}</span>
                </div>
              </div>
            </div>
            <Button className="w-full sm:w-auto">Apply Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
