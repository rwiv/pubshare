import {ColumnDef, Row} from "@tanstack/react-table";
import {FileResponse} from "@/client/access/types.ts";
import {accessQueryKeys, deleteFile, download} from "@/client/access/accessClient.ts";
import {HStack} from "@/util/csshelper/layoutComponents.ts";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon, DownloadIcon} from "@radix-ui/react-icons";
import {isoToPretty} from "@/util/date.ts";
import {useQueryClient} from "@tanstack/react-query";

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

  return (
    <HStack className="justify-end">
      <Button
        variant="ghost" className="h-8 w-8 p-0 rounded-full"
        css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
        onClick={onDownload}>
        <DownloadIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" className="h-8 w-8 p-0 rounded-full"
        css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
        onClick={onDelete}>
        <Cross1Icon className="h-4 w-4" />
      </Button>
    </HStack>
  )
}

export const fileColumns: ColumnDef<FileResponse>[] = [
  {
    accessorKey: "path",
    header: () => (<div className="text-center">Name</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("path")}</div>
    )
  },
  {
    accessorKey: "lastModified",
    header: () => (<div className="text-center">Modified</div>),
    cell: ({ row }) => (
      <div className="text-center">{isoToPretty(row.getValue("lastModified"))}</div>
    )
  },
  {
    accessorKey: "size",
    header: () => (<div className="text-center">Size</div>),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("size")}</div>
    )
  },
  {
    id: "buttons",
    cell: ButtonSet,
  },
];
