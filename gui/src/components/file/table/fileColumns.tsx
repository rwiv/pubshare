import {ColumnDef, Row} from "@tanstack/react-table";
import {FileResponse} from "@/client/access/types.ts";
import {accessQueryKeys, deleteFile, download} from "@/client/access/accessClient.ts";
import {HStack} from "@/util/css/layoutComponents.ts";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon, DownloadIcon} from "@radix-ui/react-icons";
import {isoToPretty} from "@/util/date.ts";
import {useQueryClient} from "@tanstack/react-query";
import {ReactNode} from "react";

function ButtonSet({ row }: { row: Row<FileResponse> }) {
  const queryClient = useQueryClient();
  const file = row.original;

  const onDownload = async  () => {
    if (file.isDirectory) return;
    await download(file.path);
  }

  const onDelete = async () => {
    await deleteFile({ key: file.path });
    await queryClient.invalidateQueries({ queryKey: [accessQueryKeys.list] });
  };

  function Icon({ children }: { children: ReactNode }) {
    return (
      <Button
        variant="ghost" className="h-8 w-8 p-0 rounded-full"
        css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
      >
        {children}
      </Button>
    )
  }

  return (
    <HStack className="justify-end mr-2">
      {!file.isDirectory && (
        <Icon>
          <DownloadIcon className="h-4 w-4" onClick={onDownload} />
        </Icon>
      )}
      <Icon>
        <Cross1Icon className="h-4 w-4" onClick={onDelete} />
      </Icon>
    </HStack>
  )
}

export const fileColumns: ColumnDef<FileResponse>[] = [
  {
    accessorKey: "path",
    header: () => (<div className="text-start ml-2">Name</div>),
    cell: ({ row }) => (
      <div className="text-start ml-2">{row.getValue("path")}</div>
    )
  },
  {
    accessorKey: "lastModified",
    header: () => (<div className="text-start">Modified</div>),
    cell: ({ row }) => (
      <div className="text-start">{isoToPretty(row.getValue("lastModified"))}</div>
    )
  },
  {
    accessorKey: "size",
    header: () => (<div className="text-start">Size</div>),
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("size")}</div>
    )
  },
  {
    id: "buttons",
    cell: ButtonSet,
  },
];
