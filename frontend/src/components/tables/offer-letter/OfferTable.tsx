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

interface OfferLetterTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}

export function OfferLetterTable<T>({ columns, data }: OfferLetterTableProps<T>) {
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
      <div className="flex items-start justify-end  ">
        <div className="flex gap-3">
          <Input
            className="w-[190px] sm:w-3xs"
            placeholder="Search Applicant..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
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
                <DialogTitle>Filters</DialogTitle>
                <DialogDescription>Apply filters to refine your search.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                {table.getColumn("status") && (
                  <DataTableFilter
                    column={table.getColumn("status")}
                    title="Status"
                    options={[
                      { label: "View Application", value: "view-application" },
                      { label: "View Applicant Profile", value: "view-profile" },
                      { label: "Edit Offer Letter", value: "edit-offer-letter" },
                      { label: "Send Offer Letter", value: "send-offer-letter" },
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
