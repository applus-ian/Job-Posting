import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import CustomBadge from "../badges/CustomBadge";
import { JobAppliedCard } from "../job/JobAppliedCard";

export function ApplicationOverviewCard() {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex flex-col-reverse lg:flex-row justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <Avatar className="w-16 h-16 rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h6 className="text-wrap text-lg font-semibold">Mike Arthur Minoza</h6>
              <p className="text-xs ">mikearthurminoza@gmail.com</p>
            </div>
          </div>
          <div className="flex justify-end items-start">
            <CustomBadge label="hired" status="success" />
          </div>
        </div>
        <JobAppliedCard />
      </CardContent>
    </Card>
  );
}
