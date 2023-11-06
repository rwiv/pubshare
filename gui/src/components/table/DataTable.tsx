import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {PlusIcon} from "@radix-ui/react-icons";
import {Center} from "@/util/csshelper/layoutComponents.ts";
import React from "react";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onClickRow?: (row: T) => void;
  openDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  addDialog?: React.ReactNode;
}

export function DataTable<T>({ data, columns, onClickRow, openDialog, addDialog }: DataTableProps<T>) {

  const table = useReactTable<T>({
    data, columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/40">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id} className="cursor-pointer"
                onClick={() => {if (onClickRow) onClickRow(row.original)}}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
          {openDialog && (
            <TableRow
              className="cursor-pointer bg-muted/10"
              onClick={() => openDialog(true)}
            >
              <TableCell
                colSpan={columns.length}
                className="h-12 text-center"
              >
                <Center>
                  <PlusIcon className="w-4 h-4" />
                </Center>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {addDialog}
    </div>
  )
}