'use client';

import { cn } from '@/lib/utils';
import { format, addDays, startOfMonth, startOfWeek, endOfMonth, addMonths, subMonths } from 'date-fns';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InterviewData } from './sample-data';

// Export these types so they can be imported in other files
export type Interview = InterviewData;

export type CalendarViewProps = {
  currentMonth: Date;
  interviews: Interview[];
  onMonthChange?: (date: Date) => void; // Added callback for month change
};

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

  // Get interviews for a specific day
  const getInterviewsForDay = (day: Date) => {
    return interviews.filter(interview => 
      interview.date.getDate() === day.getDate() && 
      interview.date.getMonth() === day.getMonth() && 
      interview.date.getFullYear() === day.getFullYear()
    );
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

  return (
    <div className="h-full flex flex-col">
      {/* Month navigation */}
      <div className="flex justify-center items-center mb-2 md:mb-4 px-2 md:px-4 pt-2 md:pt-4">
        <button 
          onClick={handlePreviousMonth}
          className="px-2 md:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
         <ChevronLeft className="h-4 w-3 md:h-5 md:w-4" />
        </button>
        <h2 className="text-base md:text-xl font-semibold mx-4">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button 
          onClick={handleNextMonth}
          className="px-2 md:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <ChevronRight className="h-4 w-3 md:h-5 md:w-4" />
        </button> 
      </div>

      {/* Calendar grid */}
      <div className="hidden sm:grid grid-cols-7 text-center border-b max-w-4xl mx-auto w-full">
        {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map((day) => (
          <div key={day} className="text-xs py-2 font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="hidden sm:grid grid-cols-7 divide-x divide-y flex-1 max-w-4xl mx-auto w-full">
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
              <div className="text-xs p-1">{format(day, 'd')}</div>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {interviews.map((interview, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "text-blue-700 px-1 py-0.5 text-[10px] text-nowrap overflow-hidden whitespace-nowrap",
                      interview.bgColor || "bg-blue-100"
                    )}
                  >
                    {interview.time} - {interview.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile view calendar list */}
      <div className="flex flex-col sm:hidden overflow-y-auto flex-1 max-w-md mx-auto w-full">
        {days.filter(day => 
          day.getMonth() === currentMonth.getMonth() && 
          getInterviewsForDay(day).length > 0
        ).map((day, i) => {
          const interviews = getInterviewsForDay(day);
          
          return (
            <div key={i} className="border-b last:border-b-0">
              <div className="p-2 bg-gray-50 font-medium text-sm">
                {format(day, 'EEEE, MMMM d')}
              </div>
              <div className="divide-y">
                {interviews.map((interview, idx) => (
                  <div 
                    key={idx} 
                    className="p-2 flex justify-between items-center"
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="text-sm">{interview.name}</div>
                    <div className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      {interview.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {days.filter(day => 
          day.getMonth() === currentMonth.getMonth() && 
          getInterviewsForDay(day).length > 0
        ).length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No interviews scheduled this month.
          </div>
        )}
      </div>

      {/* Interview Details Modal */}
      {showModal && selectedDay && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md shadow-md max-w-sm w-full mx-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-base font-semibold">
                Interviews for {format(selectedDay, 'MMMM d, yyyy')}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="max-h-[40vh] overflow-y-auto p-3">
              {dayInterviews.map((interview, idx) => (
                <div key={idx} className="py-2 px-1 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{interview.name}</div>
                    <div className="flex items-center">
                      {/* Time display moved closer to the button */}
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mr-2">
                        {interview.time}
                      </div>
                      {/* View Details Button - Allows users to see more information about the interview */}
                      <button 
                        className="text-xs bg-orange-500 hover:bg-orange-400 text-white px-2 py-1 rounded-md transition-colors"
                        onClick={(e) => {
                          // Prevent the click from bubbling up to parent elements
                          e.stopPropagation();
                          // Navigate to interview details page
                          router.push(`/view-application/${interview.id}`);
                        }}
                      >
                        Interview Details
                      </button>
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
