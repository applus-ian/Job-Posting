import { Card, CardHeader, CardContent } from "../ui/card";

export function BioCard({ bio }: { bio: string }) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Bio</CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  );
}
