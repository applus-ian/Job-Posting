"use client";

import { useRouter } from "next/navigation";
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
  SquarePen,
  SendHorizonal,
} from "lucide-react";

type ActionLabels = "View Application" | "View Applicant Profile" | "Edit Offer Letter" | "Send Offer Letter" ;
const actionIcons: Record<ActionLabels, React.ReactNode> = {
  "View Application": <Mails className="h-5 w-5 mr-2" />,
  "View Applicant Profile": <Eye className="h-5 w-5 mr-2" />,
  "Edit Offer Letter": <SquarePen className="h-5 w-5 mr-2" />,
  "Send Offer Letter": <SendHorizonal className="h-5 w-5 mr-2" />,
};

export type OfferLetterStatus =
  | "Sent"
  | "Draft";

export type OfferLetterAction = {
  label: ActionLabels;
  value: string;
};

export type OfferLetter = {
  id: string;
  name: string;
  job_applied: string;
  status: OfferLetterStatus;
  sent_at: string;
  actions: OfferLetterAction[];
  profile_picture?: string;
};

export const columns: ColumnDef<OfferLetter>[] = [
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
    accessorKey: "sent_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Applied <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("sent_at"));
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
      const offer = row.original;
      const router = useRouter();
    
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {offer.actions.map((action) => (
              <DropdownMenuItem
                key={action.value}
                onClick={() => {
                  if (action.value === "send-offer-letter") {
                    router.push(`offer-letters/${offer.id}`);
                  } else {
                    console.log(`Action: ${action.label}`);
                  }
                }}
              >
                {actionIcons[action.label]} {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }  
];
