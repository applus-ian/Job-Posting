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
import { FilterIcon, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SavedApplicantMultipleConfirmModal } from "@/components/savedapplicant/SavedApplicantMultipleConfirmModal";

interface ShortlistedTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function ShortlistedTable<T>({ columns, data }: ShortlistedTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [openModal, setOpenModal] = React.useState(false);

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
    enableRowSelection: true,
  });

  const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;
  return (
    <>
      <div className={`flex items-start ${hasSelectedRows ? "justify-between" : "justify-end"}`}>
        {hasSelectedRows && (
          <Button
            onClick={() => {
              const ids = table
                .getSelectedRowModel()
                .rows.map((row) => row.getValue("select") as number);

              setSelectedIds(ids);
              setOpenModal(true);
            }}
          >
            Remove Selected
          </Button>
        )}
        <div className="flex gap-3">
          <Input
            className="w-[190px] sm:w-3xs"
            placeholder="Search Applicant Name..."
            value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("full_name")?.setFilterValue(event.target.value)}
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
                    options={Array.from(
                      new Set(
                        data
                          .map((item: any) => {
                            const application = item.job_posting?.applications?.find(
                              (app: any) => app.applicant_id === item.applicant_id
                            );
                            return application?.status;
                          })
                          .filter(Boolean)
                      )
                    ).map((status) => ({
                      label: capitalize(String(status)),
                      value: String(status),
                    }))}
                  />
                )}
                {table.getColumn("title") && (
                  <DataTableFilter
                    column={table.getColumn("title")}
                    title="Job Title"
                    options={Array.from(
                      new Set(data.map((item: any) => item.job_posting?.title).filter(Boolean))
                    ).map((title) => ({
                      label: String(title),
                      value: String(title),
                    }))}
                  />
                )}

                {table.getColumn("category") && (
                  <DataTableFilter
                    column={table.getColumn("category")}
                    title="Category"
                    options={Array.from(
                      new Set(data.map((item: any) => item.job_posting?.category).filter(Boolean))
                    ).map((category) => ({
                      label: String(category),
                      value: String(category),
                    }))}
                  />
                )}
                {table.getColumn("employment_type") && (
                  <DataTableFilter
                    column={table.getColumn("employment_type")}
                    title="Employment Type"
                    options={Array.from(
                      new Set(
                        data.map((item: any) => item.job_posting?.employment_type).filter(Boolean)
                      )
                    ).map((employment_type) => ({
                      label: capitalize(String(employment_type)),
                      value: String(employment_type),
                    }))}
                  />
                )}
                {table.getColumn("employment_level") && (
                  <DataTableFilter
                    column={table.getColumn("employment_level")}
                    title="Employment Level"
                    options={Array.from(
                      new Set(
                        data.map((item: any) => item.job_posting?.employment_level).filter(Boolean)
                      )
                    ).map((employment_level) => ({
                      label: capitalize(String(employment_level)),
                      value: String(employment_level),
                    }))}
                  />
                )}
                {table.getColumn("work_setup") && (
                  <DataTableFilter
                    column={table.getColumn("work_setup")}
                    title="Work Setup"
                    options={Array.from(
                      new Set(data.map((item: any) => item.job_posting?.work_setup).filter(Boolean))
                    ).map((work_setup) => ({
                      label: capitalize(String(work_setup)),
                      value: String(work_setup),
                    }))}
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

      {selectedIds && (
        <SavedApplicantMultipleConfirmModal
          ids={selectedIds}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
}
