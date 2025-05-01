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
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export type AllApplication = {
  id: string;
  job: {
    id: string;
    title: string;
    category: string;
    department: string;
    vacancies: number;
    salary_min: number;
    salary_max: number;
    employment_type: string;
    employment_level: string;
    work_setup: string;
  };
  applicant: {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    phone: string;
    expected_salary: number;
  };
  status: "submitted" | "interview" | "withdrawn" | "offered" | "hired";
  applied_date: string;
};

export function useAllApplicationColumns(): ColumnDef<AllApplication>[] {
  const router = useRouter();
  return [
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
      accessorKey: "applicant",
      accessorFn: (row) => {
        const applicant = row.applicant;
        return `${applicant.first_name} ${applicant.middle_name ?? ""} ${applicant.last_name}`.trim();
      },
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
        const email = row.original.applicant.email;
        return (
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{fullName}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: "expected_salary",
      accessorKey: "applicant.expected_salary",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Expected Salary <ArrowUpDown className="text-gray-400" size={10} />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const expectedSalary = getValue() as number;
        return <span>{`₱${expectedSalary.toLocaleString()}`}</span>;
      },
    },
    {
      id: "job_applied",
      accessorKey: "job.title",
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
        const title = row.original.job.title;
        const min = row.original.job.salary_min;
        const max = row.original.job.salary_max;

        return (
          <div className="flex flex-col">
            <p>{title}</p>
            <p className="text-xs text-gray-500">{`₱${min} - ₱${max}`}</p>
          </div>
        );
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <CustomBadge label={row.getValue("status")} status={row.getValue("status")} />;
      },
    },
    {
      id: "department",
      accessorKey: "department",
      header: () => null,
      cell: () => null,
    },
    {
      id: "category",
      accessorKey: "category",
      header: () => null,
      cell: () => null,
    },
    {
      id: "employment_type",
      accessorKey: "employment_type",
      header: () => null,
      cell: () => null,
    },
    {
      id: "employment_level",
      accessorKey: "employment_level",
      header: () => null,
      cell: () => null,
    },
    {
      id: "work_setup",
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
