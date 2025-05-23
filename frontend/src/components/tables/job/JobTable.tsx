"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { DataTableFilter } from "../DataTableFilter";
import { DataTablePagination } from "../DataTablePagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, FilterIcon, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface JobTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}
export function JobTable<T>({ columns, data }: JobTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const hasActiveFilters = columnFilters.some(
    (filter) => filter.value !== undefined && filter.value !== ""
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <div className="flex items-start justify-between">
        <Link href="/hr/create-jobposting">
          <Button>
            <Plus /> <span className="hidden sm:flex">Post a Job</span>
          </Button>
        </Link>
        <div className="flex gap-3">
          <Input
            className="w-[190px] sm:w-3xs"
            placeholder="Search Job Title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="text-gray-500" />
                <span className="hidden sm:flex">Filters</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle> Filters</DialogTitle>
                <DialogDescription>Apply filters to refine your search.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                {table.getColumn("status") && (
                  <DataTableFilter
                    column={table.getColumn("status")}
                    title="Status"
                    options={[
                      { label: "Open", value: "open" },
                      { label: "Closed", value: "closed" },
                      { label: "Draft", value: "draft" },
                    ]}
                  />
                )}
                {table.getColumn("category") && (
                  <DataTableFilter
                    column={table.getColumn("category")}
                    title="Category"
                    options={[
                      { label: "IT & Software", value: "IT & Software" },
                      { label: "Marketing", value: "Marketing" },
                      { label: "Human Resources", value: "Human Resources" },
                      { label: "Customer Service", value: "Customer Service" },
                      { label: "Management", value: "Management" },
                    ]}
                  />
                )}
                {table.getColumn("hidden_employment_type") && (
                  <DataTableFilter
                    column={table.getColumn("hidden_employment_type")}
                    title="Employment Type"
                    options={[
                      { label: "Full-Time", value: "Full-Time" },
                      { label: "Part-Time", value: "Part-Time" },
                      { label: "Contract", value: "Contract" },
                    ]}
                  />
                )}

                {table.getColumn("hidden_employment_level") && (
                  <DataTableFilter
                    column={table.getColumn("hidden_employment_level")}
                    title="Employment Level"
                    options={[
                      { label: "Entry-Level", value: "Entry-Level" },
                      { label: "Mid-Level", value: "Mid-Level" },
                      { label: "Senior-Level", value: "Senior-Level" },
                    ]}
                  />
                )}

                {table.getColumn("hidden_work_setup") && (
                  <DataTableFilter
                    column={table.getColumn("hidden_work_setup")}
                    title="Work Setup"
                    options={[
                      { label: "Onsite", value: "Onsite" },
                      { label: "Remote", value: "Remote" },
                      { label: "Hybrid", value: "Hybrid" },
                    ]}
                  />
                )}
              </div>
              {hasActiveFilters && (
                <>
                  <Separator />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setColumnFilters([]);
                    }}
                  >
                    <X /> Clear Filters
                  </Button>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <DataTable table={table} columnsLength={columns.length} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
