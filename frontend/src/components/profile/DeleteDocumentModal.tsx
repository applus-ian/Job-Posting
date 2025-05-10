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
import { useDocument } from "@/hooks/useDocument";
import { DeleteDocumentModalProps, DocumentType } from "@/types/profile";
import { Loader2 } from "lucide-react";

export function DeleteDocumentModal({
  openDialog,
  setOpenDialog,
  document,
}: DeleteDocumentModalProps) {
  const { deleteResumeMutation, deleteCoverLetterMutation } = useDocument();

  const handleDeleteDownload = (type: DocumentType, id: number) => {
    if (type === "resume") {
      deleteResumeMutation.mutate(id);
    } else if (type === "coverletter") {
      deleteCoverLetterMutation.mutate(id);
    }
  };

  const isPending = deleteResumeMutation.isPending || deleteCoverLetterMutation.isPending;

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Document?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the file <strong>{document.file_name}</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => setOpenDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => handleDeleteDownload(document.type, document.id)}
          >
            {isPending ? (
              <span className="flex items-center gap-1">
                <Loader2 size={20} className="animate-spin" />
                Deleting...
              </span>
            ) : (
              <span>Delete</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
