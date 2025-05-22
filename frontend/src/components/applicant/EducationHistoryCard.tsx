import { EducationHistory } from "@/types/profile";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function EducationHistoryCard({
  educationhistory,
}: {
  educationhistory: EducationHistory[];
}) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Education</CardHeader>
      <CardContent className="space-y-4">
        {educationhistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">No education history available.</p>
        ) : (
          educationhistory.map((edu, index) => (
            <div key={edu.id ?? index}>
              <h4 className="text-base font-medium">
                {edu.degree} in {edu.course}
              </h4>
              <p className="text-sm text-muted-foreground">
                {edu.school} · {edu.start_year}–{edu.end_year}
              </p>
              {index !== educationhistory.length - 1 && <Separator />}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
