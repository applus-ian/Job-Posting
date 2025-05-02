// Define the interview type with all necessary fields
export interface InterviewData {
  id: string;
  date: Date;
  time: string;
  name: string;
  status: 'pending' | 'upcoming' | 'completed' | 'canceled';
  jobTitle: string;
  company?: string;
  interviewType: 'in-person' | 'video' | 'phone';
  bgColor?: string;
  address?: string;      // For in-person interviews
  meetingLink?: string;  // For video interviews
}

// Define interviewer type
export interface InterviewerData {
  id: string;
  name: string;
  position: string;
  department: string;
  email?: string;
}

// Sample interview data
export const sampleInterviews: InterviewData[] = [
  { 
    id: 'int-001',
    date: new Date(2025, 0, 2), 
    time: '7:00AM', 
    name: 'Mike Minoza', 
    status: 'upcoming',
    jobTitle: 'Frontend Developer',
    interviewType: 'video',
    meetingLink: 'https://meet.google.com/abc-defg-hij'
  },
  { 
    id: 'int-002',
    date: new Date(2025, 0, 3), 
    time: '7:00AM', 
    name: 'John Smith', 
    status: 'pending',
    jobTitle: 'UX Designer',
    interviewType: 'in-person',
    address: '123 Main Street, Suite 456, San Francisco, CA'
  },
  { 
    id: 'int-003',
    date: new Date(2025, 0, 3), 
    time: '7:00AM', 
    name: 'Sarah Johnson', 
    status: 'completed',
    jobTitle: 'Project Manager',
    interviewType: 'phone'
  },
  { 
    id: 'int-004',
    date: new Date(2025, 0, 4), 
    time: '7:00AM', 
    name: 'Chris Lee', 
    status: 'upcoming',
    jobTitle: 'Backend Developer',
    interviewType: 'video',
    meetingLink: 'https://zoom.us/j/123456789'
  },
  { 
    id: 'int-005',
    date: new Date(2025, 0, 4), 
    time: '7:00AM', 
    name: 'Alex Wong', 
    status: 'canceled',
    jobTitle: 'Product Manager',
    interviewType: 'in-person',
    address: '456 Market Street, 10th Floor, New York, NY'
  },
  { 
    id: 'int-006',
    date: new Date(2025, 0, 5), 
    time: '7:00AM', 
    name: 'Mike Minoza', 
    status: 'upcoming',
    jobTitle: 'DevOps Engineer',
    interviewType: 'video',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc123'
  },
  { 
    id: 'int-007',
    date: new Date(2025, 0, 8), 
    time: '7:00AM', 
    name: 'Mike Minoza', 
    bgColor: 'bg-green-100',
    status: 'upcoming',
    jobTitle: 'Software Engineer',
    interviewType: 'video',
    meetingLink: 'https://meet.google.com/xyz-abcd-123'
  },
  { 
    id: 'int-008',
    date: new Date(2025, 0, 11), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'upcoming',
    jobTitle: 'Full Stack Developer',
    interviewType: 'video',
    meetingLink: 'https://zoom.us/j/987654321'
  },
  { 
    id: 'int-009',
    date: new Date(2025, 0, 14), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'pending',
    jobTitle: 'QA Engineer',
    interviewType: 'in-person',
    address: '789 Tech Blvd, Building B, Austin, TX'
  },
  { 
    id: 'int-010',
    date: new Date(2025, 0, 17), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'upcoming',
    jobTitle: 'UI Developer',
    interviewType: 'video',
    meetingLink: 'https://meet.google.com/def-xyz-abc'
  },
  { 
    id: 'int-011',
    date: new Date(2025, 0, 20), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'upcoming',
    jobTitle: 'Mobile Developer',
    interviewType: 'video',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/xyz789'
  },
  { 
    id: 'int-012',
    date: new Date(2025, 0, 21), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'completed',
    jobTitle: 'Data Analyst',
    interviewType: 'phone'
  },
  { 
    id: 'int-013',
    date: new Date(2025, 0, 24), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'upcoming',
    jobTitle: 'System Architect',
    interviewType: 'video',
    meetingLink: 'https://zoom.us/j/12345abcde'
  },
  { 
    id: 'int-014',
    date: new Date(2025, 0, 25), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'pending',
    jobTitle: 'Cloud Engineer',
    interviewType: 'video',
    meetingLink: 'https://meet.google.com/ghi-jkl-mno'
  },
  { 
    id: 'int-015',
    date: new Date(2025, 0, 26), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'upcoming',
    jobTitle: 'Network Engineer',
    interviewType: 'in-person',
    address: '101 Tech Park Drive, Suite 300, Seattle, WA'
  },
  { 
    id: 'int-016',
    date: new Date(2025, 0, 26), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'canceled',
    jobTitle: 'Security Analyst',
    interviewType: 'phone'
  },
  { 
    id: 'int-017',
    date: new Date(2025, 0, 31), 
    time: '7:00AM', 
    name: 'Mike Minoza',
    status: 'upcoming',
    jobTitle: 'Technical Lead',
    interviewType: 'video',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/def456'
  },
];

// Sample interviewers data
export const sampleInterviewers: InterviewerData[] = [
  {
    id: 'int-001',
    name: 'David Williams',
    position: 'HR Manager',
    department: 'Human Resources',
    email: 'david.williams@company.com'
  },
  {
    id: 'int-002',
    name: 'Emily Brown',
    position: 'Tech Lead',
    department: 'Engineering',
    email: 'emily.brown@company.com'
  },
  {
    id: 'int-003',
    name: 'Robert Chen',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'robert.chen@company.com'
  },
  {
    id: 'int-004',
    name: 'Jennifer Garcia',
    position: 'UX Director',
    department: 'Design',
    email: 'jennifer.garcia@company.com'
  },
  {
    id: 'int-005',
    name: 'Michael Taylor',
    position: 'CTO',
    department: 'Executive',
    email: 'michael.taylor@company.com'
  },
  {
    id: 'int-006',
    name: 'Lisa Patel',
    position: 'Project Manager',
    department: 'Product',
    email: 'lisa.patel@company.com'
  }
];
