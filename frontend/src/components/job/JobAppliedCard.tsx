import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { UserSquare2 } from "lucide-react";

export function JobAppliedCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applied</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-1 w-[120px]">
            <UserSquare2 size={28} className="text-primary" />
            <p className="text-xs text-gray-600">Job Title</p>
            <p className="text-xs font-medium">Senior Developer</p>
          </div>
          {/* Employment Type */}
          <div className="flex flex-col gap-1 w-[120px]">
            <UserSquare2 size={28} className="text-primary" />
            <p className="text-xs text-gray-600">Employment Type</p>
            <p className="text-xs font-medium">Full-Time</p>
          </div>

          {/* Employment Level */}
          <div className="flex flex-col gap-1 w-[120px]">
            <UserSquare2 size={28} className="text-primary" />
            <p className="text-xs text-gray-600">Employment Level</p>
            <p className="text-xs font-medium">Mid-Level</p>
          </div>

          {/* Offered Salary */}
          <div className="flex flex-col gap-1 w-[120px]">
            <UserSquare2 size={28} className="text-primary" />
            <p className="text-xs text-gray-600">Offered Salary</p>
            <p className="text-xs font-medium">$3,500 - $4,500</p>
          </div>

          {/* Work Setup */}
          <div className="flex flex-col gap-1 w-[120px]">
            <UserSquare2 size={28} className="text-primary" />
            <p className="text-xs text-gray-600">Work Setup</p>
            <p className="text-xs font-medium">Hybrid</p>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1 w-[120px]">
            <UserSquare2 size={28} className="text-primary" />
            <p className="text-xs text-gray-600">Location</p>
            <p className="text-xs font-medium">Makati, PH</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
