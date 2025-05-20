"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import CustomBadge from "../../badges/CustomBadge";
import { useRouter } from "next/navigation";
import { Application } from "@/types/application";

export function useApplicationColumns(): ColumnDef<Application>[] {
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
        const applicationId = row.original.id;
        return (
          <Button size={"sm"} onClick={() => router.push(`/my-applications/${applicationId}`)}>
            View
          </Button>
        );
      },
    },
  ];
}
