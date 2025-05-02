import { Card, CardHeader, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function EducationHistoryCard() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Education</CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-base font-medium">Bachelor of Science in Information Systems</h4>
          <p className="text-sm text-muted-foreground">Cebu Technological University · 2018–2022</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-base font-medium">Bachelor of Science in Information Systems</h4>
          <p className="text-sm text-muted-foreground">Cebu Technological University · 2018–2022</p>
        </div>
      </CardContent>
    </Card>
  );
}
