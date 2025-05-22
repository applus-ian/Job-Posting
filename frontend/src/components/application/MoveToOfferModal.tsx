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
import { X } from "lucide-react";

interface MoveToOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function MoveToOfferModal({
  open,
  onOpenChange,
  onConfirm,
}: MoveToOfferModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-center justify-between">
          <DialogHeader>
            <DialogTitle>Move to Offer</DialogTitle>
          </DialogHeader>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Are you sure you want to move this applicant to the <strong>Offer</strong> stage?
          This action cannot be undone.
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
