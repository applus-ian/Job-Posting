import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import CustomBadge from "../badges/CustomBadge";

export function InterviewSummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500">Interview Status</p>
            <CustomBadge label="completed" status="success" />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500">Date and Time</p>
            <p className="text-xs font-medium truncate w-full">
              Tuesday, April 15, 2025 at 10:00 AM
            </p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500">Interview Type</p>
            <p className="text-xs font-medium truncate w-full">Online</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500">Meeting Link</p>
            <a
              href="/"
              target="_blank"
              className="text-xs text-primary font-medium truncate w-full"
            >
              https://meet.google.com/abc-defg-hij
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
