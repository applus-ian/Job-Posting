import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function FeedbackCard() {
  const rating = 4;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 rounded-full shrink-0">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">Jane HR</span>
                  <span className="text-xs text-gray-500">April 22, 2025 at 3:45 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-700">
              The applicant demonstrated a good understanding of basic coding concepts and
              problem-solving skills. However, they need to improve their communication and
              confidence in explaining technical solutions. With some experience, they have great
              potential
            </div>
          </div>
          <Separator orientation="horizontal" className="mt-3" />
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 rounded-full shrink-0">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">Jane HR</span>
                  <span className="text-xs text-gray-500">April 22, 2025 at 3:45 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-700">
              The applicant demonstrated a good understanding of basic coding concepts and
              problem-solving skills. However, they need to improve their communication and
              confidence in explaining technical solutions. With some experience, they have great
              potential
            </div>
          </div>
          <Separator orientation="horizontal" className="mt-3" />
        </div>
      </CardContent>
    </Card>
  );
}
