import { Separator } from "../ui/separator";
import { Card, CardHeader, CardContent } from "../ui/card";

export function WorkHistoryCard() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Work Experience</CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-base font-medium">Junior Frontend Developer</h4>
          <p className="text-sm text-muted-foreground">Tech Startup Inc · 2022–2024</p>
          <p className="text-sm mt-1">
            Developed responsive web applications using React and Next.js
          </p>
        </div>
        <Separator />
        <div>
          <h4 className="text-base font-medium">Junior Frontend Developer</h4>
          <p className="text-sm text-muted-foreground">Tech Startup Inc · 2022–2024</p>
          <p className="text-sm mt-1">
            Developed responsive web applications using React and Next.js
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
