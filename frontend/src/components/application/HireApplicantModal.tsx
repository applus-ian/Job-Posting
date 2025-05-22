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
import { X } from "lucide-react";

interface HireApplicantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function HireApplicantModal({
  open,
  onOpenChange,
  onConfirm,
}: HireApplicantModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row justify-between items-start">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Hire Applicant
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mt-2">
          Are you sure you want to hire this applicant? This action cannot be undone.
        </p>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="text-orange-600 border-orange-600 hover:bg-orange-50"
            >
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
