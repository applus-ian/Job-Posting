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
import { ApplicantProfile } from "@/types/profile";

interface ApplicantProfileColumnProps {
  handleAction: (actionKey: string, applicant: ApplicantProfile) => void;
}

export function shortlistedColumn({ handleAction }: ApplicantProfileColumnProps) {
  const columns: ColumnDef<ApplicantProfile>[] = [
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
      accessorFn: (row) =>
        `${row.first_name} ${row.middle_name ?? ""} ${row.last_name} ${row.suffix ?? ""}`.trim(),
      id: "full_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
    },
    {
      accessorKey: "professional_title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Professional Title <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
    },
    {
      id: "email",
      accessorFn: (row) => row.user?.email,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },
    {
      accessorKey: "phone_number",
      header: "Phone",
    },
    {
      accessorKey: "nationality",
      header: "Nationality",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const applicant = row.original;

        const actions = [
          { label: "View Profile", key: "view" },
          { label: "Edit", key: "edit" },
          { label: "Delete", key: "delete" },
        ];

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map(({ label, key }) => (
                <DropdownMenuItem key={key} onClick={() => handleAction(key, applicant)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { columns };
}
