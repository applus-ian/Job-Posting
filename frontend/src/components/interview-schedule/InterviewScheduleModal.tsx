"use client";

import { useState, useMemo } from "react";
import { X, Calendar, Clock, MapPin, Video, Users, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleInterviews, sampleInterviewers } from "./sample-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InterviewScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (interviewData: InterviewFormData) => void;
}

export interface InterviewFormData {
  applicant: string;
  interviewers: string[];
  date: string;
  time: string;
  mode: "in-person" | "video" | "phone" | ""; // Allow empty string
  address?: string; // For in-person interviews
  meetingLink?: string; // For video interviews
}

export function InterviewScheduleModal({
  isOpen,
  onClose,
  onSchedule,
}: InterviewScheduleModalProps) {
  // State for form fields
  const [formData, setFormData] = useState<InterviewFormData>({
    applicant: "",
    interviewers: [],
    date: "",
    time: "",
    mode: "", // Start with no mode selected
    address: "",
    meetingLink: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<{
    applicant?: string;
    interviewers?: string;
    date?: string;
    time?: string;
    mode?: string;
    address?: string;
    meetingLink?: string;
  }>({});

  // Create unique applicant options from sample data
  const applicantOptions = useMemo(() => {
    // Create a map to hold unique applicants by name+job
    const uniqueApplicants = new Map();

    sampleInterviews.forEach((interview) => {
      const key = `${interview.name}-${interview.jobTitle}`.toLowerCase().replace(/\s+/g, "-");
      if (!uniqueApplicants.has(key)) {
        uniqueApplicants.set(key, {
          value: key,
          label: `${interview.name} - ${interview.jobTitle}`,
        });
      }
    });

    return Array.from(uniqueApplicants.values());
  }, []);

  // Create interviewer options from sample data
  const interviewerOptions = useMemo(() => {
    return sampleInterviewers.map((interviewer) => ({
      value: `${interviewer.name}-${interviewer.position}`.toLowerCase().replace(/\s+/g, "-"),
      label: `${interviewer.name} - ${interviewer.position}`,
    }));
  }, []);

  // Handle adding an interviewer
  const [interviewer, setInterviewer] = useState("");
  const handleAddInterviewer = () => {
    if (interviewer) {
      setFormData({
        ...formData,
        interviewers: [...formData.interviewers, interviewer],
      });
      setInterviewer("");
      setErrors({ ...errors, interviewers: undefined });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: any = {};

    if (!formData.applicant) {
      newErrors.applicant = "Please select an applicant";
    }

    if (formData.interviewers.length === 0) {
      newErrors.interviewers = "Please add at least one interviewer";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    if (!formData.mode) {
      newErrors.mode = "Please select an interview mode";
    }

    if (formData.mode === "in-person" && !formData.address) {
      newErrors.address = "Please provide an address for in-person interview";
    }

    if (formData.mode === "video" && !formData.meetingLink) {
      newErrors.meetingLink = "Please provide a meeting link for video interview";
    }

    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSchedule(formData);
      onClose();
    }
  };

  // Handle mode change
  const handleModeChange = (value: "in-person" | "video" | "phone") => {
    setFormData({ ...formData, mode: value });
    setErrors({ ...errors, mode: undefined });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 rounded-lg overflow-hidden">
        <DialogHeader className="p-6 pb-2 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Schedule New Interview
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span>Applicant</span>
              {errors.applicant && <span className="text-red-500 text-xs ml-1">*</span>}
            </label>
            <Select
              onValueChange={(value) => {
                setFormData({ ...formData, applicant: value });
                setErrors({ ...errors, applicant: undefined });
              }}
            >
              <SelectTrigger
                className={`w-full border-gray-200 ${errors.applicant ? "border-red-300 ring-red-100" : ""}`}
              >
                <SelectValue placeholder="Assign Applicant" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {applicantOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.applicant && <p className="text-xs text-red-500 mt-1">{errors.applicant}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>Interviewer(s)</span>
              {errors.interviewers && <span className="text-red-500 text-xs ml-1">*</span>}
            </label>
            <div className="flex gap-2">
              <Select onValueChange={setInterviewer} value={interviewer}>
                <SelectTrigger
                  className={`w-full border-gray-200 ${errors.interviewers ? "border-red-300 ring-red-100" : ""}`}
                >
                  <SelectValue placeholder="Assign Interviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {interviewerOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={handleAddInterviewer}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add
              </Button>
            </div>
            {errors.interviewers && (
              <p className="text-xs text-red-500 mt-1">{errors.interviewers}</p>
            )}

            {formData.interviewers.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {formData.interviewers.map((interviewerId, index) => {
                  // Find the matching interviewer option
                  const interviewer = interviewerOptions.find((opt) => opt.value === interviewerId);

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2.5 rounded-md border border-gray-100"
                    >
                      <span className="text-sm">
                        {interviewer?.label || interviewerId.replace(/-/g, " ")}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            interviewers: formData.interviewers.filter((_, i) => i !== index),
                          });
                        }}
                        className="h-6 w-6 rounded-full hover:bg-gray-200"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Date And Time</span>
              {(errors.date || errors.time) && <span className="text-red-500 text-xs ml-1">*</span>}
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="date"
                  placeholder="Enter Interview Date"
                  className={`border-gray-200 ${errors.date ? "border-red-300 ring-red-100" : ""}`}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    setErrors({ ...errors, date: undefined });
                  }}
                />
                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
              </div>
              <div className="flex-1">
                <Input
                  type="time"
                  placeholder="Enter Interview Time"
                  className={`border-gray-200 ${errors.time ? "border-red-300 ring-red-100" : ""}`}
                  onChange={(e) => {
                    setFormData({ ...formData, time: e.target.value });
                    setErrors({ ...errors, time: undefined });
                  }}
                />
                {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Interview Mode</span>
              {errors.mode && <span className="text-red-500 text-xs ml-1">*</span>}
            </label>
            <Select onValueChange={handleModeChange}>
              <SelectTrigger
                className={`w-full border-gray-200 ${errors.mode ? "border-red-300 ring-red-100" : ""}`}
              >
                <SelectValue placeholder="Select Interview Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="in-person">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>In-person</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span>Video Call</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.mode && <p className="text-xs text-red-500 mt-1">{errors.mode}</p>}
          </div>

          {formData.mode === "in-person" && (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Address</span>
                {errors.address && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <Input
                type="text"
                placeholder="Enter Interview Address"
                className={`border-gray-200 ${errors.address ? "border-red-300 ring-red-100" : ""}`}
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  setErrors({ ...errors, address: undefined });
                }}
              />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>
          )}

          {formData.mode === "video" && (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Video className="h-4 w-4 text-gray-500" />
                <span>Meeting Link</span>
                {errors.meetingLink && <span className="text-red-500 text-xs ml-1">*</span>}
              </label>
              <Input
                type="text"
                placeholder="Enter Meeting Link (e.g. Zoom, Google Meet)"
                className={`border-gray-200 ${errors.meetingLink ? "border-red-300 ring-red-100" : ""}`}
                value={formData.meetingLink}
                onChange={(e) => {
                  setFormData({ ...formData, meetingLink: e.target.value });
                  setErrors({ ...errors, meetingLink: undefined });
                }}
              />
              {errors.meetingLink && (
                <p className="text-xs text-red-500 mt-1">{errors.meetingLink}</p>
              )}
            </div>
          )}
        </form>

        <DialogFooter className="p-6 pt-2 border-t bg-gray-50">
          <div className="flex w-full justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-gray-200"
                  >
                    Cancel
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discard changes and close</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Schedule Interview
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save and create new interview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
