"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown, User } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Application } from "@/types/application";
import { formatDateTime } from "@/utils/dateFormatter";

export function useAllApplicationColumns(): ColumnDef<Application>[] {
  const router = useRouter();

  return [
    {
      accessorFn: (row) =>
        `${row.applicant?.first_name ?? ""} ${row.applicant?.middle_name ?? ""} ${row.applicant?.last_name ?? ""}`.trim(),
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
        const email = row.original.applicant?.user?.email ?? "N/A";
        const profileBaseUrl = "http://localhost:8000/storage/profile/";
        const profilePath = row.original.applicant?.user?.profile ?? "";
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
      id: "expected_salary",
      accessorFn: (row) => row.expected_salary,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expected Salary <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ getValue }) => {
        const salary = getValue() as string;
        return <p className="text-xs text-gray-500">{`₱${salary}`}</p>;
      },
    },
    {
      id: "job_applied",
      accessorFn: (row) => row.job_posting?.title,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Applied <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row }) => {
        const job = row.original.job_posting;
        const title = job?.title ?? "N/A";
        const min = job?.salary_min ?? "0";
        const max = job?.salary_max ?? "0";

        return (
          <div className="flex flex-col">
            <p>{title}</p>
            <p className="text-xs text-gray-500">{`₱${min} - ₱${max}`}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Applied <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.original.created_at!;
        return <p>{formatDateTime(date)}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <CustomBadge label={status} status={status} />;
      },
      filterFn: "arrIncludesSome",
    },
    {
      id: "department",
      accessorKey: "department",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      id: "category",
      accessorKey: "category",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      id: "employment_type",
      accessorKey: "employment_type",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      id: "employment_level",
      accessorKey: "employment_level",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      id: "work_setup",
      accessorKey: "work_setup",
      header: () => null,
      cell: () => null,
      filterFn: "arrIncludesSome",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const appId = row.original.id;
        const applicantId = row.original.applicant?.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push(`/hr/applications/${applicantId}/applicant`)}
              >
                View Applicant
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/hr/applications/${applicantId}/applicant/${appId}/view-application`)
                }
              >
                View Application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
