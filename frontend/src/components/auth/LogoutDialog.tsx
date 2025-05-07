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
import { LogoutDialogProps } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export function LogoutDialog({ openDialog, setOpenDialog }: LogoutDialogProps) {
  const { logoutMutation } = useAuth();
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out from the application. You can log in again anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={logoutMutation.isPending}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
          >
            {logoutMutation.isPending ? (
              <span className="flex items-center gap-1">
                <Loader2 size={20} className="animate-spin" />
                Logging out...
              </span>
            ) : (
              <span>Logout</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
