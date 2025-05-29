"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import { useRouter } from "next/navigation";
import { Interview } from "@/types/interview";
import { formatDateTime } from "@/utils/dateFormatter";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { format, parseISO } from "date-fns";

export function formatDate(rawDate: string) {
  if (!rawDate) return "";
  const date = parseISO(rawDate); // parse date like "2024-05-29"
  return format(date, "MMM d, yyyy"); // e.g. "May 29, 2024"
}

export function formatTime(rawTime: string) {
  if (!rawTime) return "";
  const [hours, minutes, seconds] = rawTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds || 0, 0);
  return format(date, "h:mm a"); // e.g. "2:30 PM"
}

export function useInterviewColumns(): ColumnDef<Interview>[] {
  const router = useRouter();
  return [
    {
      accessorFn: (row) =>
        `${row.application?.applicant?.first_name ?? ""} ${row.application?.applicant?.middle_name ?? ""} ${row.application?.applicant?.last_name ?? ""}`.trim(),
      id: "fullName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicant Name <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row, getValue }) => {
        const fullName = getValue() as string;
        const email = row.original.application?.applicant?.user?.email ?? "N/A";
        const profileBaseUrl = "http://localhost:8000/storage/profile/";
        const profilePath = row.original.application?.applicant?.user?.profile ?? "";
        const profileUrl = profilePath ? `${profileBaseUrl}${profilePath}` : "";

        return (
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src={profileUrl} alt="@profile" className="rounded-full object-cover" />
              <AvatarFallback className="bg-muted">
                <User className="rounded-lg text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{fullName}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
        );
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "jobApplied",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Job Applied <ArrowUpDown className="text-gray-400" size={10} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const jobApplied = row.original.application?.job_posting.title;
        return <span>{jobApplied}</span>;
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row }) => {
        const rawDate = row.original.schedule_date as string;
        return <span>{formatDate(rawDate)}</span>;
      },
    },
    {
      accessorKey: "time",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row }) => {
        const rawTime = row.original.schedule_time as string;
        return <span>{formatTime(rawTime)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <CustomBadge label={row.getValue("status")} status={row.getValue("status")} />;
      },
      filterFn: "arrIncludesSome",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const applicantId = row.original.application?.applicant_id;
        const applicationId = row.original.application_id;
        const viewUrl = `/hr/applications/${applicationId}/applicant/${applicantId}/view-application`;

        return (
          <Button size={"sm"} onClick={() => router.push(viewUrl)}>
            View
          </Button>
        );
      },
    },
  ];
}
