"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import { useRouter } from "next/navigation";
import { Application } from "@/types/application";
import { formatDateTime } from "@/utils/dateFormatter";

export function useApplicationColumns(viewApplicationType: string): ColumnDef<Application>[] {
  const router = useRouter();
  return [
    {
      accessorKey: "job_posting.title",
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
      cell: ({ row }) => row.original.job_posting?.title ?? "N/A",
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
        const min = row.original.job_posting.salary_min;
        const max = row.original.job_posting.salary_max;
        return `₱${min} - ₱${max}`;
      },
    },
    {
      accessorKey: "created_at",
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
      cell: ({ row }) => {
        const rawDate = row.original.created_at as string;
        return <span>{formatDateTime(rawDate)}</span>;
      },
    },
    // {
    //   accessorKey: "department",
    //   header: () => null,
    //   cell: () => null,
    // },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <CustomBadge label={row.getValue("status")} status={row.getValue("status")} />;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const applicantId = row.original.applicant_id;
        const applicationId = row.original.id;
        const viewUrl =
          viewApplicationType === "hr"
            ? `/hr/applications/${applicationId}/applicant/${applicantId}/view-application`
            : `/my-applications/${applicationId}`;

        return (
          <Button size={"sm"} onClick={() => router.push(viewUrl)}>
            View
          </Button>
        );
      },
    },
  ];
}
