'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { SidebarLayout } from '@/components/sidebar-layout';
import { CalendarView, Interview as CalendarInterview } from './calendar-view';
import { ListView } from './list-view';
import { Card } from '@/components/ui/card';
import { InterviewScheduleModal, InterviewFormData } from './interview-schedule-modal';
import { sampleInterviews } from './sample-data';

// Define interview type, extending the CalendarInterview type
type Interview = CalendarInterview;

export default function InterviewSchedule() {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // January 2025
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  
  // State for interviews (initialized with sample data)
  const [interviews, setInterviews] = useState<Interview[]>(sampleInterviews);

  // Handler for month change from CalendarView
  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  // Handler for scheduling interview
  const handleScheduleInterview = (data: InterviewFormData) => {
    console.log('Scheduled interview:', data);
    // In a real application, you would send this data to an API
    // and then update the interviews list with the new interview
    
    // Create a new interview object
    const newInterview: Interview = {
      id: `int-${interviews.length + 1}`.padStart(6, '0'),
      date: new Date(data.date),
      time: data.time,
      name: data.applicant.split('-')[0].replace(/-/g, ' '), // Extract name from the value
      jobTitle: data.applicant.split('-').slice(1).join(' ').replace(/-/g, ' '), // Extract position
      status: 'upcoming',
      interviewType: data.mode || 'video', // Default to video if no mode is selected
      address: data.address,
      meetingLink: data.meetingLink
    };
    
    // Add the new interview to the list
    setInterviews([...interviews, newInterview]);
  };

  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-2 w-full px-4 md:px-0 md:max-w-7xl mx-auto">
        {/* search bar - positioned to the right */}
        <div className="flex justify-end mb-2 ">
          <div className="flex items-center gap-2 w-[300px]">
            <div className="relative flex-1 sm:flex-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search Applicant" 
                className="pl-9 h-8 rounded-sm border-gray-200 bg-white text-xs w-full" 
              />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-sm border-gray-200 flex-shrink-0">
              <Filter className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
          <div className="bg-gray-200 p-0.5 rounded-sm flex w-full lg:w-full">
            <button
              onClick={() => setView('calendar')}
              className={cn(
                "py-1 px-3 rounded-sm text-xs transition-colors flex-1 sm:flex-auto",
                view === 'calendar' 
                  ? "bg-white font-medium shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              Calendar view
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                "py-1 px-3 rounded-sm text-xs transition-colors flex-1 sm:flex-auto",
                view === 'list' 
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
          <Card className="w-full md:w-[1000px] h-[450px] sm:h-[550px] md:h-[650px] p-2 sm:p-4 overflow-hidden">
            <div className="bg-white rounded-sm h-full">
              {view === 'calendar' && (
                <CalendarView 
                  currentMonth={currentMonth} 
                  interviews={interviews} 
                  onMonthChange={handleMonthChange} 
                />
              )}
              
              {view === 'list' && (
                <ListView interviews={interviews} />
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Interview Schedule Modal */}
      <InterviewScheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSchedule={handleScheduleInterview}
      />
    </SidebarLayout>
  );
}