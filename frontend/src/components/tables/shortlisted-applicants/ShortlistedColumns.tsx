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
import { ArrowUpDown, MoreHorizontal, User } from "lucide-react";
import { SavedApplicant } from "@/types/savedapplicant";
import CustomBadge from "@/components/badges/CustomBadge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDateTime } from "@/utils/dateFormatter";

interface SavedApplicantColumnProps {
  handleAction: (actionKey: string, savedapplicant: SavedApplicant) => void;
}

export function shortlistedColumn({ handleAction }: SavedApplicantColumnProps) {
  const columns: ColumnDef<SavedApplicant>[] = [
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
        `${row.applicant?.first_name ?? ""} ${row.applicant?.middle_name ?? ""} ${row.applicant?.last_name ?? ""} ${row.applicant?.suffix ?? ""}`.trim(),
      id: "full_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicant Name <ArrowUpDown className="text-gray-400 ml-1" size={10} />
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
      accessorFn: (row) => row.job_posting?.title ?? "-",
      id: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Applied <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
    },
    {
      id: "expected_salary",
      accessorFn: (row) => {
        const application = row.job_posting?.applications?.find(
          (app) => app.applicant_id === row.applicant_id
        );
        return application?.expected_salary ?? "-";
      },
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
      id: "created_at",
      accessorFn: (row) => {
        const application = row.job_posting?.applications?.find(
          (app) => app.applicant_id === row.applicant_id
        );
        return application?.created_at ?? "-";
      },
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Applied <ArrowUpDown className="text-gray-400" size={10} />
        </Button>
      ),
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <p>{formatDateTime(date)}</p>;
      },
    },
    {
      accessorFn: (row) => {
        const application = row.job_posting?.applications?.find(
          (app) => app.applicant_id === row.applicant_id
        );
        return application?.status ?? "-";
      },
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        return <CustomBadge label={row.getValue("status")} status={row.getValue("status")} />;
      },
      filterFn: "arrIncludesSome",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const applicant = row.original;

        const actions = [
          { label: "View Applicant", key: "viewApplicant" },
          { label: "View Application", key: "viewApplication" },
          { label: "Remove from shortlist", key: "unsave" },
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
