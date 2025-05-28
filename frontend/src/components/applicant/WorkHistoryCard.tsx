import { Separator } from "../ui/separator";
import { Card, CardHeader, CardContent } from "../ui/card";
import { WorkExperience } from "@/types/profile";
import { formatDateOnly } from "@/utils/dateFormatter";

export function WorkHistoryCard({ workexperience }: { workexperience: WorkExperience[] }) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Work Experience</CardHeader>
      <CardContent className="space-y-6">
        {workexperience.length === 0 ? (
          <p className="text-sm text-muted-foreground">No work experience available.</p>
        ) : (
          workexperience.map((work, index) => (
            <div key={work.id ?? index}>
              <h4 className="text-base font-medium">{work.professional_title}</h4>
              <p className="text-sm text-muted-foreground">
                Company: {work.company} · {formatDateOnly(work.start_date)} {" - "}{" "}
                {formatDateOnly(work.end_date)}
              </p>
              <p className="text-sm mt-1">{work.description}</p>
              {index !== workexperience.length - 1 && <Separator className="my-4" />}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
