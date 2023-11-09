import {ColumnDef, Row} from "@tanstack/react-table";
import {FileResponse} from "@/client/access/types.ts";
import {accessQueryKeys, deleteFile, download} from "@/client/access/accessClient.ts";
import {HStack} from "@/util/css/layoutComponents.ts";
import {Cross1Icon, DownloadIcon, PlusIcon} from "@radix-ui/react-icons";
import {isoToPretty} from "@/util/date.ts";
import {useQueryClient} from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import {useFolderCreateDialog} from "@/components/file/table/useFolderCreateDialog.tsx";
import {SmallIconButton} from "@/components/common/SmallIconButton.tsx";

function FileAddButton() {
  const {setOpen, component} = useFolderCreateDialog();

  const onFolderBtnClick = () => {
    setOpen(true);
  }

  return (
    <div className="flex justify-end m-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SmallIconButton>
            <PlusIcon className="p-2" />
          </SmallIconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <div>
              <DropdownMenuItem>Add File</DropdownMenuItem>
            </div>
            <div onClick={onFolderBtnClick}>
              <DropdownMenuItem>Add Folder</DropdownMenuItem>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
        {component}
      </DropdownMenu>
    </div>
  );
}

function RowButtonSet({ row }: { row: Row<FileResponse> }) {
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
    <HStack className="justify-end mr-2">
      {!file.isDirectory && (
        <SmallIconButton>
          <DownloadIcon className="p-2.5" onClick={onDownload} />
        </SmallIconButton>
      )}
      <SmallIconButton>
        <Cross1Icon className="p-2.5" onClick={onDelete} />
      </SmallIconButton>
    </HStack>
  )
}

export const fileColumns: ColumnDef<FileResponse>[] = [
  {
    accessorKey: "path",
    header: () => (<div className="text-start ml-2">Name</div>),
    cell: ({ row }) => (
      <div className="text-start ml-2">{row.original.path}</div>
    )
  },
  {
    accessorKey: "lastModified",
    header: () => (<div className="text-start">Modified</div>),
    cell: ({ row }) => (
      <div className="text-start">{isoToPretty(row.original.lastModified)}</div>
    )
  },
  {
    accessorKey: "size",
    header: () => (<div className="text-start">Size</div>),
    cell: ({ row }) => (
      <div className="text-start">{row.original.size}</div>
    )
  },
  {
    id: "buttons",
    header: FileAddButton,
    cell: RowButtonSet,
  },
];
