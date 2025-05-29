"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"; // ✅ Import missing MoreHorizontal
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomBadge from "../badges/CustomBadge";
import { ExternalLink } from "lucide-react";

// Interview data type
export interface InterviewData {
  id: string;
  date: Date;
  time: string;
  name: string;
  status: "pending" | "upcoming" | "completed" | "cancelled";
  jobTitle: string;
  company?: string;
  interviewType: "in-person" | "video" | "phone";
  bgColor?: string[];
  address?: string;
  meetingLink?: string;
  profileImage?: string;
}

// Optional: Interviewer type
export interface InterviewerData {
  id: string;
  name: string;
  position: string;
  department: string;
  email?: string;
}

// Styles for status badges
const statusStyles: Record<InterviewData["status"], string[]> = {
  pending: ["bg-yellow-200", "text-dark"],
  upcoming: ["bg-[#C8F5FF]", "text-[#005173]"],
  completed: ["bg-[#B6FFB2]", "text-[#00730D]"],
  cancelled: ["bg-[#FFE6E6]", "text-[#FF0000]"],
};

// Sample interview data
export const sampleInterviews: InterviewData[] = [
  {
    id: "int-001",
    date: new Date(2025, 0, 2),
    time: "2025-05-21T10:00:00Z",
    name: "Donna Alcos",
    status: "upcoming",
    jobTitle: "Frontend Developer",
    interviewType: "video",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-002",
    date: new Date(2025, 0, 3),
    time: "2025-05-21T10:00:00Z",
    name: "Mike Minoza",
    status: "pending",
    jobTitle: "UX Designer",
    interviewType: "in-person",
    address: "123 Main Street, Suite 456, San Francisco, CA",
    bgColor: statusStyles["pending"],
  },
  {
    id: "int-003",
    date: new Date(2025, 0, 3),
    time: "2025-05-21T10:00:00Z",
    name: "Sayde Marie Elegino",
    status: "cancelled",
    jobTitle: "Project Manager",
    interviewType: "phone",
    bgColor: statusStyles["cancelled"],
  },
  {
    id: "int-004",
    date: new Date(2025, 0, 4),
    time: "2025-05-21T10:00:00Z",
    name: "Yestin Roy Prado",
    status: "upcoming",
    jobTitle: "Backend Developer",
    interviewType: "video",
    meetingLink: "https://zoom.us/j/123456789",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-005",
    date: new Date(2025, 0, 4),
    time: "2025-05-21T10:00:00Z",
    name: "Michelle Zozobrado",
    status: "cancelled",
    jobTitle: "Product Manager",
    interviewType: "in-person",
    address: "456 Market Street, 10th Floor, New York, NY",
    bgColor: statusStyles["cancelled"],
  },
  {
    id: "int-006",
    date: new Date(2025, 0, 5),
    time: "2025-05-21T10:00:00Z",
    name: "Shiela Marie Arcillo",
    status: "upcoming",
    jobTitle: "DevOps Engineer",
    interviewType: "video",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/abc123",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-007",
    date: new Date(2025, 0, 8),
    time: "2025-05-21T10:00:00Z",
    name: "Valey Austine Senoy",
    status: "upcoming",
    jobTitle: "Software Engineer",
    interviewType: "video",
    meetingLink: "https://meet.google.com/xyz-abcd-123",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-008",
    date: new Date(2025, 0, 11),
    time: "2025-05-21T10:00:00Z",
    name: "Lynn Sanchez",
    status: "upcoming",
    jobTitle: "Full Stack Developer",
    interviewType: "video",
    meetingLink: "https://zoom.us/j/987654321",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-009",
    date: new Date(2025, 0, 14),
    time: "2025-05-21T10:00:00Z",
    name: "Arnulfo Estenzo IV",
    status: "pending",
    jobTitle: "QA Engineer",
    interviewType: "in-person",
    address: "789 Tech Blvd, Building B, Austin, TX",
    bgColor: statusStyles["pending"],
  },
  {
    id: "int-010",
    date: new Date(2025, 0, 17),
    time: "2025-05-21T10:00:00Z",
    name: "Cherry Ann Deloy",
    status: "upcoming",
    jobTitle: "UI Developer",
    interviewType: "video",
    meetingLink: "https://meet.google.com/def-xyz-abc",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-011",
    date: new Date(2025, 0, 20),
    time: "2025-05-21T10:00:00Z",
    name: "Manny Pacquiao",
    status: "upcoming",
    jobTitle: "Mobile Developer",
    interviewType: "video",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/xyz789",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-012",
    date: new Date(2025, 0, 21),
    time: "2025-05-21T10:00:00Z",
    name: "Rodrigo Duterte",
    status: "completed",
    jobTitle: "Data Analyst",
    interviewType: "phone",
    bgColor: statusStyles["completed"],
  },
  {
    id: "int-013",
    date: new Date(2025, 0, 24),
    time: "2025-05-21T10:00:00Z",
    name: "Leni Robredo",
    status: "upcoming",
    jobTitle: "System Architect",
    interviewType: "video",
    meetingLink: "https://zoom.us/j/12345abcde",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-014",
    date: new Date(2025, 0, 25),
    time: "2025-05-21T10:00:00Z",
    name: "Kiko Pangilinan",
    status: "pending",
    jobTitle: "Cloud Engineer",
    interviewType: "video",
    meetingLink: "https://meet.google.com/ghi-jkl-mno",
    bgColor: statusStyles["pending"],
  },
  {
    id: "int-015",
    date: new Date(2025, 0, 26),
    time: "2025-05-21T10:00:00Z",
    name: "Gwen Garcia",
    status: "upcoming",
    jobTitle: "Network Engineer",
    interviewType: "in-person",
    address: "101 Tech Park Drive, Suite 300, Seattle, WA",
    bgColor: statusStyles["upcoming"],
  },
  {
    id: "int-016",
    date: new Date(2025, 0, 26),
    time: "2025-05-21T10:00:00Z",
    name: "Arlyn Emia",
    status: "cancelled",
    jobTitle: "Security Analyst",
    interviewType: "phone",
    bgColor: statusStyles["cancelled"],
  },
  {
    id: "int-017",
    date: new Date(2025, 0, 31),
    time: "2025-05-21T10:00:00Z",
    name: "Nico Cambelisa",
    status: "upcoming",
    jobTitle: "Technical Lead",
    interviewType: "video",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/def456",
    bgColor: statusStyles["upcoming"],
  },
];

// Sample interviewers data
export const sampleInterviewers: InterviewerData[] = [
  {
    id: "int-001",
    name: "David Williams",
    position: "HR Manager",
    department: "Human Resources",
    email: "david.williams@company.com",
  },
  {
    id: "int-002",
    name: "Emily Brown",
    position: "Tech Lead",
    department: "Engineering",
    email: "emily.brown@company.com",
  },
  {
    id: "int-003",
    name: "Robert Chen",
    position: "Senior Developer",
    department: "Engineering",
    email: "robert.chen@company.com",
  },
  {
    id: "int-004",
    name: "Jennifer Garcia",
    position: "UX Director",
    department: "Design",
    email: "jennifer.garcia@company.com",
  },
  {
    id: "int-005",
    name: "Michael Taylor",
    position: "CTO",
    department: "Executive",
    email: "michael.taylor@company.com",
  },
  {
    id: "int-006",
    name: "Lisa Patel",
    position: "Project Manager",
    department: "Product",
    email: "lisa.patel@company.com",
  },
];

// Table columns
export function useInterviewColumns(): ColumnDef<InterviewData>[] {
  const router = useRouter();
  const handleViewInterview = (id: string) => {
    router.push("/hr/applications/1/applicant/1/view-application");
  };

  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicant
          <ArrowUpDown className="ml-2 text-gray-400" size={12} />
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        const profileImage = row.original.profileImage;

        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("");

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 bg-green-200">
              <AvatarImage src={profileImage || undefined} alt={name} />
              <AvatarFallback className="text-sm font-medium text-green-800">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "interviewType",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("interviewType") as InterviewData["interviewType"];

        const typeLabelMap: Record<InterviewData["interviewType"], string> = {
          "in-person": "In-Person",
          video: "Video",
          phone: "Phone",
        };

        return <span>{typeLabelMap[type]}</span>;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as Date;

        // Format options for "Feb 14, 2025"
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => {
        const timeValue = row.getValue("time") as string | Date;
        const date = new Date(timeValue); // Now TypeScript knows it's valid

        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        return <span>{formattedTime}</span>;
      },
    },
    {
      accessorKey: "jobTitle",
      header: "Job Applied",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <CustomBadge label={row.getValue("status")} status={row.getValue("status")} />;
      },
    },
    {
      id: "view",
      header: "", // You can write "Action" here if you want a column label
      cell: ({ row }) => {
        const interview = row.original;

        return (
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:text-orange-600 hover:bg-transparent p-0 h-auto group"
            onClick={() => handleViewInterview(interview.id)}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            <span className="group-hover:underline">View</span>
          </Button>
        );
      },
    },
  ];
}
