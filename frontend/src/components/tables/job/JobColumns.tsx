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
import { MoreHorizontal, UsersIcon, ArrowUpDown } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import { JobPosting } from "@/types/job";

interface JobPostingColumnProps {
  handleAction: (actionKey: string, jobposting: JobPosting) => void;
}

export function jobPostingColumn({ handleAction }: JobPostingColumnProps) {
  const columns: ColumnDef<JobPosting>[] = [
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Job Title <ArrowUpDown className="text-gray-400" size={10} />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
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
      accessorKey: "salary_min",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Salary <ArrowUpDown className="text-gray-400" size={10} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const min = row.original.salary_min;
        const max = row.original.salary_max;
        return `₱${min} - ₱${max}`;
      },
    },
    {
      id: "applicants",
      accessorFn: (row) => row.applications?.length ?? 0,
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Applicants <ArrowUpDown className="text-gray-400" size={10} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const length = row.original.applications?.length;
        return (
          <div className="flex items-center gap-2">
            <UsersIcon className="text-gray-400" size={14} /> {length}
          </div>
        );
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
      accessorKey: "hidden_category",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "hidden_employment_type",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "hidden_employment_level",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "hidden_work_setup",
      header: () => null,
      cell: () => null,
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
              { label: "Close Job", key: "close" },
              { label: "Set as Draft", key: "draft" },
              { label: "View Applicants", key: "viewApplicants" },
              { label: "View Details", key: "viewDetails" },
              { label: "Edit Job", key: "edit" },
            ];
            break;
          case "draft":
            actions = [
              { label: "Publish Job", key: "publish" },
              { label: "Edit Job", key: "edit" },
              { label: "View Details", key: "viewDetails" },
            ];
            break;
          case "closed":
            actions = [
              { label: "Publish Job", key: "publish" },
              { label: "Set as Draft", key: "draft" },
              { label: "View Applicants", key: "viewApplicants" },
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
  return { columns };
}
