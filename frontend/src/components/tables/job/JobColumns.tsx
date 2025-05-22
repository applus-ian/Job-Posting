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
import { MoreHorizontal, UsersIcon, ArrowUpDown , Upload, Eye, Users, XCircle,} from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";

export type JobPosting = {
  id: string;
  title: string;
  category: string;
  department: string;
  vacancies: number;
  salary_min: number;
  salary_max: number;
  status: "open" | "closed" | "draft";
  applicants: number;
  employment_type: string;
  employment_level: string;
  work_setup: string;
};

export const columns: ColumnDef<JobPosting>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      );
    },
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
    accessorKey: "applicants",
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
      return (
        <div className="flex items-center gap-2">
          <UsersIcon className="text-gray-400" size={14} /> {row.getValue("applicants")}
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
  },
  {
    accessorKey: "category",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "employment_type",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "employment_level",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "work_setup",
    header: () => null,
    cell: () => null,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Upload className="w-4 h-4 mr-2" />
              Publish Job
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Users className="w-4 h-4 mr-2" />
              View Applicants
            </DropdownMenuItem>

            <DropdownMenuItem>
              <XCircle className="w-4 h-4 mr-2" />
              Close Job
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];