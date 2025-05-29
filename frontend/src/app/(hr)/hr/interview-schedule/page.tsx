"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { SidebarLayout } from "@/components/sidebar-layout";
import { CalendarView } from "@/components/interview-schedule/CalendarView";
import { ListView } from "@/components/interview-schedule/ListView";
import { Card } from "@/components/ui/card";
import { Interview } from "@/types/interview";
import { useViewInterviewSchedule } from "@/hooks/query/useViewInterviewSchedule";

export default function InterviewSchedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date); // January 2025
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  const { data, isLoading } = useViewInterviewSchedule();
  return (
    <SidebarLayout breadcrumbs={[{ label: "Interview Schedules", isCurrentPage: true }]}>
      <div className="mb-3">
        <p className="text-2xl font-medium">Interview Schedules</p>
      </div>
      <div className="flex flex-col space-y-2 w-full ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
          <div className="bg-gray-200 p-0.5 rounded-sm flex w-full lg:w-full">
            <button
              onClick={() => setView("calendar")}
              className={cn(
                "py-1 px-3 rounded-sm text-xs transition-colors flex-1 sm:flex-auto",
                view === "calendar"
                  ? "bg-white font-medium shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Calendar view
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "py-1 px-3 rounded-sm text-xs transition-colors flex-1 sm:flex-auto",
                view === "list"
                  ? "bg-white font-medium shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              List view
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center w-full">
          <Card className="w-full p-2 sm:p-4 overflow-hidden">
            <div className="bg-white rounded-sm h-full">
              {view === "calendar" && (
                <CalendarView
                  currentMonth={currentMonth}
                  interviews={data?.interviews}
                  onMonthChange={handleMonthChange}
                />
              )}

              {view === "list" && <ListView interviews={data?.interviews} />}
            </div>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
