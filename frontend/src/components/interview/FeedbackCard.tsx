import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Feedback } from "@/types/interview";

export function FeedbackCard({ feedback }: { feedback: Feedback[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {feedback.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 rounded-full shrink-0">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Reviewer Avatar"
                      className="rounded-full"
                    />
                    <AvatarFallback>HR</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">Jane HR</span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-700 mt-2">{item.comment}</div>

              {index !== feedback.length - 1 && (
                <Separator orientation="horizontal" className="mt-3" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
