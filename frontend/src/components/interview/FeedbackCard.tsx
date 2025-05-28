"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Star, MessageSquare, MoreHorizontal } from "lucide-react";
import { Separator } from "../ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Feedback, Interview } from "@/types/interview";
import { formatDateTime } from "../../utils/dateFormatter";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GiveFeedbackModal } from "./GiveFeedbackModal";
import { useInterview } from "@/hooks/useInterview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FeedbackCard({
  feedback,
  interview,
}: {
  feedback: Feedback[];
  interview: Interview;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [editFeedback, setEditFeedback] = useState<Feedback | null>(null);
  const { deleteFeedbackMutation } = useInterview();

  // set editFeeback to null when modal is closed
  useEffect(() => {
    if (!openModal) {
      setEditFeedback(null);
    }
  }, [openModal]);

  const handleDelete = async (feedback: Feedback) => {
    await deleteFeedbackMutation.mutateAsync({
      interviewId: feedback.interview_id!,
      feedbackId: feedback.id!,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Interview Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {feedback.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 text-sm py-10">
              <MessageSquare className="w-10 h-10 mb-2" />
              <p>No feedbacks</p>
            </div>
          ) : (
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
                          {formatDateTime(item.created_at!)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenModal(true);
                              setEditFeedback(item);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(item)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={17}
                            className={
                              i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mt-2">{item.comment}</div>

                  {index !== feedback.length - 1 && (
                    <Separator orientation="horizontal" className="mt-3" />
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button onClick={() => setOpenModal(true)}>Give Feedback</Button>
          </div>
        </CardContent>
      </Card>

      <GiveFeedbackModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        interview={interview}
        feedback={editFeedback}
      />
    </>
  );
}
