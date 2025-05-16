"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApplyJobModalProps } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ApplyJobModal({ jobposting, openModal, setOpenModal }: ApplyJobModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Job</DialogTitle>
          <DialogDescription>
            Submit your application for the <strong>{jobposting.title}</strong>. Make sure your
            profile and information are complete.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 my-4">
          <Label htmlFor="expected_salary">Expected Salary</Label>
          <Input placeholder="Enter Expected Salary" id="expected_salary" />
        </div>

        <RadioGroup defaultValue="use-default-resume">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="use-default-resume" id="r1" />
            <Label htmlFor="r1">Use Default Resume</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="use-default-cover-letter" id="r2" />
            <Label htmlFor="r2">Use Default Cover Letter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="submit-new-resume" id="r3" />
            <Label htmlFor="r3">Submit New Resume</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="submit-new-cover-letter" id="r4" />
            <Label htmlFor="r4">Submit New Cover Letter</Label>
          </div>
        </RadioGroup>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="flex items-center gap-2">
            Apply Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
