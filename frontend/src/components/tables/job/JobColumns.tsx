"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UsersIcon, ArrowUpDown } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import { JobPosting } from "@/types/job";

interface JobPostingColumnProps {
  handleAction: (actionKey: string, jobposting: JobPosting) => void;
}

export function jobPostingColumn({ handleAction }: JobPostingColumnProps): ColumnDef<JobPosting>[] {
  const columns: ColumnDef<JobPosting>[] = [
    {
      id: "title",
      accessorFn: (row) => row.title,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Title
          <ArrowUpDown className="text-gray-400" size={12} />
        </Button>
      ),
      filterFn: "includesString",
    },
    {
      id: "category",
      accessorFn: (row) => row.category,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      filterFn: "arrIncludesSome",
    },
    {
      id: "employment_type",
      accessorFn: (row) => [row.employment_type],
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      id: "employment_level",
      accessorFn: (row) => [row.employment_level],
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      id: "salary",
      accessorFn: (row) => `${row.salary_min} - ${row.salary_max}`,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salary <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row }) => {
        const min = row.original.salary_min;
        const max = row.original.salary_max;
        return `₱${min} - ₱${max}`;
      },
    },
    {
      id: "applicants",
      accessorFn: (row) => row.applications?.length ?? 0,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicants <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row }) => {
        const length = row.original.applications?.length ?? 0;
        return (
          <div className="flex items-center gap-2">
            <UsersIcon className="text-gray-400" size={14} /> {length}
          </div>
        );
      },
    },
    {
      id: "status",
      accessorFn: (row) => row.status,
      header: "Status",
      cell: ({ row }) => (
        <CustomBadge label={row.getValue("status")} status={row.getValue("status")} />
      ),
      filterFn: "arrIncludesSome",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const jobposting = row.original;
        const status = row.getValue("status");

        let actions: { label: string; key: string }[] = [];

        switch (status) {
          case "open":
            actions = [
              { label: "Close Job", key: "closed" },
              { label: "Set as Draft", key: "draft" },
              { label: "View Details", key: "viewDetails" },
              { label: "Edit Job", key: "edit" },
            ];
            break;
          case "draft":
            actions = [
              { label: "Publish Job", key: "open" },
              { label: "Edit Job", key: "edit" },
              { label: "View Details", key: "viewDetails" },
            ];
            break;
          case "closed":
            actions = [
              { label: "Publish Job", key: "open" },
              { label: "Set as Draft", key: "draft" },
              { label: "View Details", key: "viewDetails" },
              { label: "Edit Job", key: "edit" },
            ];
            break;
          default:
            actions = [
              { label: "View Details", key: "viewDetails" },
              { label: "Edit Job", key: "edit" },
            ];
        }

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
                <DropdownMenuItem key={key} onClick={() => handleAction(key, jobposting)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}
