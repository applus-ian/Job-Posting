'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock, User, Building, Video } from "lucide-react";

type Interview = {
  date: Date;
  time: string;
  name: string;
  bgColor?: string;
  status?: 'pending' | 'upcoming' | 'completed' | 'canceled';
  jobTitle?: string;
  company?: string;
  interviewType?: 'in-person' | 'video' | 'phone';
};

type ListViewProps = {
  interviews: Interview[];
};

export function ListView({ interviews }: ListViewProps) {
  // Sort interviews by date/time
  const sortedInterviews = [...interviews].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="h-full flex flex-col p-2 sm:p-4">
      {/* Desktop header row */}
      <div className="hidden md:grid grid-cols-12 py-2 px-4 bg-gray-50 text-xs font-medium text-gray-500 border-b max-w-4xl mx-auto w-full">
        <div className="col-span-3">Candidate</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-3">Position</div>
        <div className="col-span-2">Status</div>
      </div>

      {/* Desktop and tablet layout */}
      <div className="hidden sm:block divide-y overflow-y-auto max-w-4xl mx-auto w-full" style={{ height: 'calc(100% - 42px)' }}>
        {sortedInterviews.map((interview, idx) => (
          <div key={idx} className="grid md:grid-cols-12 sm:grid-cols-6 py-3 px-4 items-center hover:bg-gray-50 text-sm">
            <div className="md:col-span-3 sm:col-span-2 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.name}&background=random`} />
                <AvatarFallback>{interview.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{interview.name}</div>
                <div className="text-xs text-gray-500">{interview.interviewType === 'video' ? 'Video Call' : interview.interviewType === 'in-person' ? 'In Person' : 'Phone Call'}</div>
              </div>
            </div>
            
            <div className="md:col-span-2 sm:col-span-1 flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span>{format(interview.date, 'MMM d, yyyy')}</span>
            </div>
            
            <div className="md:col-span-2 sm:col-span-1 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span>{interview.time}</span>
            </div>
            
            <div className="md:col-span-3 sm:col-span-1 flex items-center gap-2">
              <Building className="h-3.5 w-3.5 text-gray-400" />
              <span>{interview.jobTitle || 'Software Engineer'} {interview.company ? `at ${interview.company}` : ''}</span>
            </div>
            
            <div className="md:col-span-2 sm:col-span-1">
              <Badge 
                className={
                  interview.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                  interview.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                  interview.status === 'canceled' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                  'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                }
              >
                {interview.status || 'pending'}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="sm:hidden divide-y overflow-y-auto h-full max-w-md mx-auto w-full">
        {sortedInterviews.map((interview, idx) => (
          <div key={idx} className="py-3 px-2 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${interview.name}&background=random`} />
                  <AvatarFallback>{interview.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{interview.name}</div>
                  <div className="text-xs text-gray-500">{interview.jobTitle || 'Software Engineer'}</div>
                </div>
              </div>
              <Badge 
                className={
                  interview.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                  interview.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                  interview.status === 'canceled' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                  'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                }
              >
                {interview.status || 'pending'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-xs text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-gray-400" />
                <span>{format(interview.date, 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span>{interview.time}</span>
              </div>
              <div className="flex items-center gap-1 col-span-2">
                <Video className="h-3 w-3 text-gray-400" />
                <span>{interview.interviewType === 'video' ? 'Video Call' : interview.interviewType === 'in-person' ? 'In Person' : 'Phone Call'}</span>
              </div>
            </div>
          </div>
        ))}
        
        {sortedInterviews.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No interviews scheduled.
          </div>
        )}
      </div>
      
      {sortedInterviews.length === 0 && (
        <div className="hidden sm:block py-8 text-center text-gray-500">
          No interviews scheduled.
        </div>
      )}
    </div>
  );
}
