import { Card, CardHeader, CardContent } from "../ui/card";

export function BioCard() {
  const bio = `A detail-oriented and highly motivated junior frontend developer 
    with experience building responsive web applications using React and Next.js. 
    Passionate about creating user-friendly interfaces and working in collaborative teams.`;

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Bio</CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  );
}
