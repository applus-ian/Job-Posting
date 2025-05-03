import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import CustomBadge from "../badges/CustomBadge";
import { JobAppliedCard } from "../job/JobAppliedCard";

export function ApplicationOverviewCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h6 className="text-lg font-semibold">Mike Arthur Minoza</h6>
              <p className="text-xs">mikearthurminoza@gmail.com</p>
            </div>
          </div>
          <CustomBadge label="hired" status="success" />
        </div>
        <JobAppliedCard />
      </CardContent>
    </Card>
  );
}
