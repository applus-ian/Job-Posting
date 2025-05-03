import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
export function InterviewerCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interviewer(s)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center w-full gap-2">
            <Avatar className="w-10 h-10 rounded-full shrink-0">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs text-gray-500">Mike Minoza</p>
              <p className="text-xs font-medium truncate w-full">mikearthruminoza@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center w-full gap-2">
            <Avatar className="w-10 h-10 rounded-full shrink-0">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs text-gray-500">Mike Minoza</p>
              <p className="text-xs font-medium truncate w-full">mikearthruminoza@gmail.com</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
