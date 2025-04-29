"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import {
  Mails,
  Eye,
  XCircle,
  CalendarClock,
  MessageSquareText,
  MailPlus,
} from "lucide-react";

type ActionLabels = "View Application" | "View Profile" | "Reject" | "Schedule Interview" | "Submit Feedback" | "Create Offer Letter" | "Reschedule Interview" | "View Reject Reason";

const actionIcons: Record<ActionLabels, React.ReactNode> = {
  "View Application": <Mails className="h-5 w-5 mr-2" />,
  "View Profile": <Eye className="h-5 w-5 mr-2" />,
  "Reject": <XCircle className="h-5 w-5 mr-2" />,
  "Schedule Interview": <CalendarClock className="h-5 w-5 mr-2" />,
  "Submit Feedback": <MessageSquareText className="h-5 w-5 mr-2" />,
  "Create Offer Letter": <MailPlus className="h-5 w-5 mr-2" />,
  "Reschedule Interview": <CalendarClock className="h-5 w-5 mr-2" />,
  "View Reject Reason": <XCircle className="h-5 w-5 mr-2" />,
};

export type ApplicationStatus =
  | "Received"
  | "Reviewed"
  | "Interview"
  | "Offer"
  | "Hired"
  | "Withdrawn"
  | "No Show"
  | "Rejected";

export type ApplicationAction = {
  label: ActionLabels;
  value: string;
};

export type Applications = {
  id: string;
  name: string;
  email: string;
  job_applied: string;
  status: ApplicationStatus;
  applied_date: string;
  actions: ApplicationAction[];
  profile_picture?: string;
};

export const columns: ColumnDef<Applications>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const hasProfile = row.original.profile_picture; // optional field
      const profileUrl = hasProfile
        ? row.original.profile_picture
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(row.original.name)}&background=random`;
    
      return (
        <div className="flex items-center gap-2">
          <img
            src={profileUrl}
            alt={row.original.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span>{row.original.name}</span>
        </div>
      );
    }    
  },  
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
  },
  {
    accessorKey: "job_applied",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Job Applied <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <CustomBadge label={row.getValue("status")} status={row.getValue("status")} />
      );
    },
  },
  {
    accessorKey: "applied_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Applied <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("applied_date"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },    
  },  
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;
  
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {application.actions.map((action) => (
              <DropdownMenuItem key={action.value}>
                {/* Render the icon and action label */}
                {actionIcons[action.label]} {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }  
];
