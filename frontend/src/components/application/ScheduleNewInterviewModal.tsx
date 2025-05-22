"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { ScheduleInterviewConfirmationModal } from "./ScheduleInterviewConfirmationModal";

interface ScheduleInterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: () => void;
}

export function ScheduleInterviewModal({
  open,
  onOpenChange,
  onSchedule,
}: ScheduleInterviewModalProps) {
  const [interviewers, setInterviewers] = useState<string[]>([""]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (index: number, value: string) => {
    const updated = [...interviewers];
    updated[index] = value;
    setInterviewers(updated);
  };

  const addInterviewer = () => {
    setInterviewers([...interviewers, ""]);
  };

  // Called when Confirm is clicked on the confirmation modal
  const handleConfirm = () => {
    onSchedule();       // Call parent handler
    onOpenChange(false); // Close main modal
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-between">
            <DialogHeader>
              <DialogTitle>Schedule New Interview</DialogTitle>
            </DialogHeader>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Applicant</Label>
              <Input value="Mike Minoza" disabled />
            </div>

            <div className="grid gap-2">
              <Label>Interviewer(s)</Label>
              {interviewers.map((value, index) => (
                <Select
                  key={index}
                  value={value}
                  onValueChange={(v) => handleChange(index, v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Assign Interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interviewer1">Interviewer 1</SelectItem>
                    <SelectItem value="interviewer2">Interviewer 2</SelectItem>
                  </SelectContent>
                </Select>
              ))}

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                  onClick={addInterviewer}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="grid gap-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Mode</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Interview Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
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
              onClick={() => setConfirmOpen(true)}
            >
              Schedule Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ScheduleInterviewConfirmationModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => {
            onSchedule();       // schedule the interview
            onOpenChange(false); // close main modal
            setConfirmOpen(false); // close confirmation modal
        }}
        />
    </>
  );
}
