import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {FileResponse} from "@/client/access/types.ts";
import {accessQueryKeys, download, list, upload} from "@/client/access/accessClient.ts";
import {useAccessStore} from "@/stores/accessStore.ts";
import React, {useState} from "react";
import {fileColumns} from "@/components/file/table/fileColumns.tsx";

interface FileTableProps {
  className?: string;
}

export function FileTable({ className }: FileTableProps) {

  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);
  const {curFile, curDirectory, setCurDirectory, setCurFile} = useAccessStore();
  const { data } = useQuery({
    queryKey: [accessQueryKeys.list],
    queryFn: () => list(curDirectory?.path ?? ""),
    initialData: [],
  });
  const table = useReactTable<FileResponse>({
    data, columns: fileColumns,
    getCoreRowModel: getCoreRowModel()
  });

  const onClick = (file: FileResponse) => {
    setCurFile(file);
    console.log(file)
  };

  const onDoubleClick = async (file: FileResponse) => {
    if (file.isDirectory) {
      setCurDirectory(file);
      await queryClient.setQueryData([accessQueryKeys.list], await list(file.path));
    } else {
      await download(file.path);
    }
  }

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    const key = (curDirectory?.path ?? "") + file.name;
    await upload({
      key,
      fileCreation: {
        path: key,
        memberDefaultPerm: "KNOWN",
        guestDefaultPerm: "KNOWN",
      },
    }, file);
    await queryClient.invalidateQueries({ queryKey: [accessQueryKeys.list] });
  }

  return (
    <div
      className={className}
      css={{ backgroundColor: isDragging ? "#c2e7ff" : "" }}
      onDragOver={event => event.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDrop={onDrop}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                css={{
                  userSelect: "none",
                  cursor: "default",
                  backgroundColor: row.original.id === curFile?.id ? "#c2e7ff" : "",
                  "&:hover": {
                    backgroundColor: row.original.id === curFile?.id ? "#c2e7ff" : "#f0f1f1",
                  },
                }}
                onClick={() => onClick(row.original)}
                onDoubleClick={() => onDoubleClick(row.original)}
              >
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
                colSpan={fileColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
