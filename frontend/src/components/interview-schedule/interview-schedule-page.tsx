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

// Define interview type, extending the CalendarInterview type
type Interview = CalendarInterview & {
  // Additional fields used in list view
  status?: 'pending' | 'upcoming' | 'completed' | 'canceled';
  jobTitle?: string;
  company?: string;
  interviewType?: 'in-person' | 'video' | 'phone';
};

export default function InterviewSchedule() {
  
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // January 2025
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  // Handler for month change from CalendarView
  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  // Mock interview data
  const interviews: Interview[] = [
    { 
      date: new Date(2025, 0, 2), 
      time: '7:00AM', 
      name: 'Mike Minoza', 
      status: 'upcoming',
      jobTitle: 'Frontend Developer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 3), 
      time: '7:00AM', 
      name: 'John Smith', 
      status: 'pending',
      jobTitle: 'UX Designer',
      interviewType: 'in-person'
    },
    { 
      date: new Date(2025, 0, 3), 
      time: '7:00AM', 
      name: 'Sarah Johnson', 
      status: 'completed',
      jobTitle: 'Project Manager',
      interviewType: 'phone'
    },
    { 
      date: new Date(2025, 0, 4), 
      time: '7:00AM', 
      name: 'Chris Lee', 
      status: 'upcoming',
      jobTitle: 'Backend Developer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 4), 
      time: '7:00AM', 
      name: 'Alex Wong', 
      status: 'canceled',
      jobTitle: 'Product Manager',
      interviewType: 'in-person'
    },
    { 
      date: new Date(2025, 0, 5), 
      time: '7:00AM', 
      name: 'Mike Minoza', 
      status: 'upcoming',
      jobTitle: 'DevOps Engineer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 8), 
      time: '7:00AM', 
      name: 'Mike Minoza', 
      bgColor: 'bg-green-100',
      status: 'upcoming',
      jobTitle: 'Software Engineer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 11), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'upcoming',
      jobTitle: 'Full Stack Developer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 14), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'pending',
      jobTitle: 'QA Engineer',
      interviewType: 'in-person'
    },
    { 
      date: new Date(2025, 0, 17), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'upcoming',
      jobTitle: 'UI Developer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 20), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'upcoming',
      jobTitle: 'Mobile Developer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 21), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'completed',
      jobTitle: 'Data Analyst',
      interviewType: 'phone'
    },
    { 
      date: new Date(2025, 0, 24), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'upcoming',
      jobTitle: 'System Architect',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 25), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'pending',
      jobTitle: 'Cloud Engineer',
      interviewType: 'video'
    },
    { 
      date: new Date(2025, 0, 26), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'upcoming',
      jobTitle: 'Network Engineer',
      interviewType: 'in-person'
    },
    { 
      date: new Date(2025, 0, 26), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'canceled',
      jobTitle: 'Security Analyst',
      interviewType: 'phone'
    },
    { 
      date: new Date(2025, 0, 31), 
      time: '7:00AM', 
      name: 'Mike Minoza',
      status: 'upcoming',
      jobTitle: 'Technical Lead',
      interviewType: 'video'
    },
  ];
  
  return (
    <SidebarLayout>
      <div className="flex flex-col space-y-2 w-full px-4 md:px-0 md:max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
          <div className="bg-gray-200 p-0.5 rounded-sm flex w-full sm:w-auto">
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

          <div className="flex items-center gap-2 w-full sm:w-auto">
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
    </SidebarLayout>
  );
}