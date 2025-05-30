import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ApplicationStatusModalProps } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const statusMessages = [
  {
    status: "received",
    title: "Mark as Received?",
    description: "This application will be marked as received. The applicant will be notified.",
    confirmText: "Confirm Received",
  },
  {
    status: "reviewed",
    title: "Mark as Reviewed?",
    description:
      "This application will be marked as reviewed. You have completed the initial screening.",
    confirmText: "Confirm Reviewed",
  },
  {
    status: "offer",
    title: "Move to Offer Stage?",
    description:
      "The applicant will be marked as in the 'Offer' stage. Please note that the offer process will be handled manually.",
    confirmText: "Mark as Offer",
  },
  {
    status: "hired",
    title: "Mark as Hired?",
    description: "This applicant will be marked as hired. Congratulations!",
    confirmText: "Confirm Hire",
  },
  {
    status: "rejected",
    title: "Reject Applicant?",
    description: "This applicant will be marked as rejected. You can no longer proceed with their application.",
    confirmText: "Confirm Rejection",
  }
];

export function ApplicationStatusModal({
  openModal,
  setOpenModal,
  status,
  onConfirm,
  isLoading,
}: ApplicationStatusModalProps) {
  const message = statusMessages.find((m) => m.status === status);

  if (!message) return null;

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{message.title}</AlertDialogTitle>
          <AlertDialogDescription>{message.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button onClick={() => onConfirm()} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-1">
                <Loader2 size={20} className="animate-spin" />
                Loading...
              </span>
            ) : (
              <span>{message.confirmText}</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
