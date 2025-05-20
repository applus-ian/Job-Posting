import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobDetailsModalProps } from "@/types/job";
import { Button } from "@/components/ui/button";

export function JobDetailsModal({ jobposting, openModal, setOpenModal }: JobDetailsModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{jobposting.title}</DialogTitle>
          <DialogDescription>asdasdasdasd</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
