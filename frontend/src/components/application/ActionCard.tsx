import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export function ActionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Action</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant={"destructive"} className="w-full">
          Reject
        </Button>
      </CardContent>
    </Card>
  );
}
