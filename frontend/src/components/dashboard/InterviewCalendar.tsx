"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

// Sample interview data
const interviewData = [
  {
    time: "09:30",
    name: "Mike Minoza",
    type: "Online Interview",
    date: "Wednesday, 06 July 2023",
  },
  {
    time: "09:30",
    name: "Mike Minoza",
    type: "Online Interview",
    date: "Wednesday, 06 July 2023",
  },
  {
    time: "09:30",
    name: "Mike Minoza",
    type: "Online Interview",
    date: "Wednesday, 06 July 2023",
  },
];

export function InterviewCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 2, 20));
  const [month, setMonth] = useState<Date>(new Date(2025, 2, 1));

  // Highlighted dates
  const highlightedDates = [new Date(2025, 2, 6), new Date(2025, 2, 8)];

  // Custom modifiers for highlighted dates
  const modifiers = {
    highlighted: (date: Date) =>
      highlightedDates.some(
        (d) =>
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
      ),
  };

  // Custom modifiers styles
  const modifiersStyles = {
    highlighted: {
      backgroundColor: "#FFEDD5",
      color: "#F97316",
      borderRadius: "0.375rem",
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          month={month}
          onMonthChange={setMonth}
          classNames={{
            caption: "flex justify-between items-center mb-2",
            caption_label: "text-sm font-medium",
            nav: "flex gap-1",
            nav_button: "p-1 rounded-md bg-orange-500 text-white hover:bg-orange-600",
            nav_button_previous: "opacity-100 cursor-pointer",
            nav_button_next: "opacity-100 cursor-pointer",
            table: "w-full border-collapse",
            head_row: "flex w-full",
            head_cell: "text-center text-xs font-medium flex-1",
            row: "flex w-full my-1",
            cell: "text-center relative flex-1 px-0",
            day: "h-7 w-7 text-xs p-0 font-normal mx-auto flex items-center justify-center aria-selected:bg-transparent",
            day_selected: "border border-orange-500 text-black rounded-md",
            day_today: "bg-transparent",
          }}
          components={{
            IconLeft: () => <ChevronLeft className="h-3 w-3" />,
            IconRight: () => <ChevronRight className="h-3 w-3" />,
          }}
        />
      </div>

      {/* Interview schedules */}
      <div className="mt-4">
        <h3 className="text-xs font-medium mb-2">Interview Schedules</h3>
        <p className="text-xs text-gray-600 mb-3">{interviewData[0].date}</p>

        {/* Schedule list */}
        <div className="space-y-3">
          {interviewData.map((interview, index) => (
            <div key={index} className="flex gap-2">
              <div className="text-gray-600 font-medium text-xs w-10">{interview.time}</div>
              <div className="border-l-2 border-orange-400 pl-2 flex-1">
                <p className="text-xs font-medium">{interview.name}</p>
                <p className="text-xs text-gray-500">{interview.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
