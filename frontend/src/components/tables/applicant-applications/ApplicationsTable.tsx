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
import { DataTablePagination } from "../DataTablePagination";

interface ApplicationsTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
}
export function ApplicationsTable<T>({ columns, data }: ApplicationsTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

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
      <div className="w-full flex flex-col gap-2 dark:text-white">
        <DataTable table={table} columnsLength={columns.length} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
