"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import { useRouter } from "next/navigation";

export type Application = {
  id: string;
  title: string;
  category: string;
  department: string;
  vacancies: number;
  salary_min: number;
  salary_max: number;
  status: "submitted" | "interview" | "withdrawn" | "offered" | "hired";
  applicants: number;
  employment_type: string;
  employment_level: string;
  work_setup: string;
  applied_date: string;
};

export function useApplicationColumns(): ColumnDef<Application>[] {
  const router = useRouter();
  return [
    {
      accessorKey: "title",
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
      accessorKey: "applied_date",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Applied <ArrowUpDown className="text-gray-400" size={10} />
          </Button>
        );
      },
    },
    {
      accessorKey: "department",
      header: () => null,
      cell: () => null,
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
              <DropdownMenuItem onClick={() => router.push("/my-applications/1")}>
                View Application
              </DropdownMenuItem>
              <DropdownMenuItem>Withdraw Application</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
