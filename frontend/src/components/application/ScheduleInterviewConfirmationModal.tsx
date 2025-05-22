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
import { Button } from "@/components/ui/button";

interface ScheduleInterviewConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ScheduleInterviewConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
}: ScheduleInterviewConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Interview</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          Are you sure you want to schedule this interview? This action cannot be undone.
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
