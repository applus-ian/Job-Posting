"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { SavedApplicantConfirmModalProps } from "@/types/savedapplicant";
import { useSavedApplicant } from "@/hooks/useSavedApplicant";

export function SavedApplicantConfirmModal({
  savedapplicant,
  openModal,
  setOpenModal,
}: SavedApplicantConfirmModalProps) {
  const { unsaveApplicantMutation } = useSavedApplicant(savedapplicant.applicant_id!);

  const handleConfirm = async () => {
    if (savedapplicant.id) {
      await unsaveApplicantMutation.mutateAsync(savedapplicant.id!);
    }
  };

  //close modal when success
  useEffect(() => {
    if (unsaveApplicantMutation.isSuccess) {
      setOpenModal(false);
    }
  }, [setOpenModal, unsaveApplicantMutation.isSuccess]);

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove from shortlist?</AlertDialogTitle>
          <AlertDialogDescription>
            This applicant will be removed from your shortlist. They will no longer be marked as
            shortlisted for this job.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={unsaveApplicantMutation.isPending}>Cancel</AlertDialogCancel>
          <Button onClick={handleConfirm} disabled={unsaveApplicantMutation.isPending}>
            {unsaveApplicantMutation.isPending ? (
              <span className="flex items-center gap-1">
                <Loader2 size={20} className="animate-spin" />
                Loading...
              </span>
            ) : (
              <span>Remove</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
