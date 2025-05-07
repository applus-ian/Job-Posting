"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteEducationModalProps } from "@/types/profile";
import { useProfile } from "@/hooks/useProfile";
import { Loader2, Trash2Icon } from "lucide-react";
import { useEffect } from "react";

export function DeleteEducationModal({
  openDialog,
  setOpenDialog,
  educationhistory,
}: DeleteEducationModalProps) {
  const { deleteEducationHistoryMutation } = useProfile();

  useEffect(() => {
    if (deleteEducationHistoryMutation.isSuccess) setOpenDialog(false);
  }, [deleteEducationHistoryMutation, setOpenDialog]);

  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Education History?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The selected education history will be permanently removed
            from your profile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteEducationHistoryMutation.isPending}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteEducationHistoryMutation.isPending}
            onClick={() => deleteEducationHistoryMutation.mutateAsync(educationhistory.id!)}
          >
            {deleteEducationHistoryMutation.isPending ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2Icon />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
