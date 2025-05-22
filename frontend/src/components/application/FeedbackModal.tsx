"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: number, comment: string) => void;
}

export function FeedbackModal({ open, onOpenChange, onSubmit }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit(rating, comment);
    onOpenChange(false);
    setRating(0);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Give Feedback</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Your feedback helps us improve our interview process.
        </p>

        {/* Star Rating */}
        <div className="flex justify-center space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-7 h-7 cursor-pointer transition ${
                (hoverRating || rating) >= star
                  ? "fill-orange-500 stroke-orange-500"
                  : "stroke-orange-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        {/* Comment Box */}
        <div className="mt-4">
          <label htmlFor="comment" className="block mb-1 font-medium">
            Your Comment
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter Comment"
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="text-orange-600 border-orange-600 hover:bg-orange-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
