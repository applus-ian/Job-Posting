"use client";

import { cn } from "@/lib/utils";
import {
  format,
  addDays,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Interview } from "@/types/interview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomBadge from "../badges/CustomBadge";
import { statusStyles } from "../badges/CustomBadge";

export type CalendarViewProps = {
  currentMonth: Date;
  interviews: Interview[];
  onMonthChange?: (date: Date) => void; // Added callback for month change
};

function getInterviewDateTime(interview: Interview) {
  const dateStr = format(new Date(interview.schedule_date), "yyyy-MM-dd");
  // Add "T" between date and time for valid ISO string
  const isoString = `${dateStr}T${interview.schedule_time}`;
  return new Date(isoString);
}

function getFullName(interview: Interview) {
  const first = interview.application?.applicant?.first_name ?? "";
  const middleName = interview.application?.applicant?.middle_name ?? "";
  const middleInitial = middleName ? middleName.charAt(0).toUpperCase() + "." : "";
  const last = interview.application?.applicant?.last_name ?? "";
  return [first, middleInitial, last].filter(Boolean).join(" ");
}

export function CalendarView({ currentMonth, interviews, onMonthChange }: CalendarViewProps) {
  const router = useRouter();

  // State for modal
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dayInterviews, setDayInterviews] = useState<Interview[]>([]);

  // Generate days for the calendar
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start from Monday

    const days = [];
    const daysToShow = 35; // 5 weeks

    let day = startDate;
    for (let i = 0; i < daysToShow; i++) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const getInterviewsForDay = (day: Date) => {
    return (interviews || []).filter((interview) => {
      // Format schedule_date as yyyy-MM-dd (assuming schedule_date is a date string or Date)
      const dateStr = format(new Date(interview.schedule_date), "yyyy-MM-dd");

      // Combine date and time strings to form full datetime string
      // Assuming schedule_time is in "HH:mm:ss" format
      const combined = `${dateStr} ${interview.schedule_time}`;

      // Parse combined string as Date
      const date = new Date(combined);

      // Debug log if invalid
      if (isNaN(date.getTime())) {
        console.error("Invalid date parsed:", combined);
      }

      // Compare date parts to check if interview is on the given day
      return (
        date.getDate() === day.getDate() &&
        date.getMonth() === day.getMonth() &&
        date.getFullYear() === day.getFullYear()
      );
    });
  };

  // Handle month navigation
  const handlePreviousMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    onMonthChange?.(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    onMonthChange?.(newMonth);
  };

  // Handle day click to show modal
  const handleDayClick = (day: Date) => {
    const interviews = getInterviewsForDay(day);
    if (interviews.length > 0) {
      setSelectedDay(day);
      setDayInterviews(interviews);
      setShowModal(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedDay(null);
    setDayInterviews([]);
  };

  const days = generateCalendarDays();
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-full flex flex-col">
      {/* Month navigation */}
      <div className="flex justify-center items-center mb-2 w-full">
        <button
          onClick={handlePreviousMonth}
          className="px-2 md:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <ChevronLeft className="h-4 w-3 md:h-5 md:w-4" />
        </button>
        <div className="flex ms-9 me-3 items-center">
          <h1 className="text-base md:text-xl font-semibold">{format(currentMonth, "MMMM")}</h1>
          {/* Year Dropdown */}
          <Select
            value={currentMonth.getFullYear().toString()}
            onValueChange={(value) => {
              const newYear = parseInt(value);
              const updated = new Date(currentMonth);
              updated.setFullYear(newYear);
              onMonthChange?.(updated);
            }}
          >
            <SelectTrigger className="rounded border border-gray-300 text-base md:text-xl border-none shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-auto">
              {Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
                const year = 2000 + i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <button
          onClick={handleNextMonth}
          className="px-2 md:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <ChevronRight className="h-4 w-3 md:h-5 md:w-4" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 text-center border-b w-full">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="text-xs py-2 font-medium text-gray-500">
            {/* Mobile (S, M, ...) and Desktop (SUN, MON, ...) */}
            <span className="block sm:hidden">{day}</span>
            <span className="hidden sm:block">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][index]}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 divide-x divide-y flex-1 w-full">
        {days.map((day, i) => {
          const interviews = getInterviewsForDay(day);
          const hasInterviews = interviews.length > 0;
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

          return (
            <div
              key={i}
              className={cn(
                "h-24 p-1 flex flex-col", // Fixed height
                !isCurrentMonth && "bg-gray-50 text-gray-400",
                hasInterviews && "cursor-pointer hover:bg-gray-100"
              )}
              onClick={() => hasInterviews && handleDayClick(day)}
            >
              <div className="text-[10px] sm:text-xs p-1">{format(day, "d")}</div>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {interviews.map((interview, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "text-dark px-3 py-0.5 text-[9px] sm:text-[10px] lg:text-xs overflow-hidden whitespace-nowrap rounded-full",
                      statusStyles[interview.status].bg || "bg-orange-200"
                    )}
                  >
                    <span className="truncate max-w-[100%] inline-block align-middle">
                      {getInterviewDateTime(interview).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}{" "}
                      - {getFullName(interview)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interview Details Modal */}
      {showModal && selectedDay && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md shadow-md max-w-sm w-full mx-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-base font-semibold">
                Interviews for {format(selectedDay, "MMMM d, yyyy")}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[40vh] overflow-y-auto p-3">
              {dayInterviews.map((interview, idx) => (
                <div
                  key={idx}
                  className="py-2 px-1 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-100"
                >
                  <div
                    className="flex justify-between items-center"
                    onClick={() => {
                      const applicationId = interview.application_id;
                      const applicantId = interview.application?.applicant_id;
                      router.push(
                        `/hr/applications/${applicantId}/applicant/${applicationId}/view-application`
                      );
                    }}
                  >
                    <div className="font-medium text-sm">{getFullName(interview)}</div>
                    <div className="flex items-center">
                      {/* Time display moved closer to the button */}
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mr-2">
                        {getInterviewDateTime(interview).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                      <div>
                        <CustomBadge label={interview.status} status={interview.status} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 flex justify-end">
              <button
                onClick={closeModal}
                className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
