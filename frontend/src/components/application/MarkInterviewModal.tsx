"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MarkInterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  status: string; // e.g., "complete", "rejected", "in progress"
}

export function MarkInterviewModal({
  open,
  onOpenChange,
  onConfirm,
  status,
}: MarkInterviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Interview</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mt-2">
          Are you sure you want to mark this interview as <strong>{status}</strong>? This action cannot be undone.
        </p>

        <DialogFooter className="mt-4 flex justify-end gap-2">
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
