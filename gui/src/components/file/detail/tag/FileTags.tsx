import {useFileTagCreateDialog} from "@/components/file/detail/tag/useFileTagCreateDialog.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {FileTagResponse} from "@/client/file/types";
import {deleteFileTag, fileTagQueryKeys, findFileTagsByFileId} from "@/client/file/fileTagClient.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {FileResponse} from "@/client/access/types.ts";
import {FileHeader} from "@/components/file/detail/common/FileHeader.tsx";

interface FileTagsProps {
  file: FileResponse;
  className?: string;
}

export function FileTags({ file, className }: FileTagsProps) {

  const {setOpen, component} = useFileTagCreateDialog(file.id);
  const {data: fileTags} = useQuery<FileTagResponse[]>({
    queryKey: [fileTagQueryKeys.fileId, file.id],
    queryFn: ctx => findFileTagsByFileId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  return (
    <div className={className}>
      <FileHeader title="Tags" onAdd={() => setOpen(true)} />
      <div className="flex flex-wrap my-2">
        {fileTags.map(fileTag => (
          <BadgeInfo key={fileTag.id} fileTag={fileTag} file={file} />
        ))}
      </div>
      {component}
    </div>
  )
}

function BadgeInfo({ fileTag, file }: { fileTag: FileTagResponse, file: FileResponse }) {

  const queryClient = useQueryClient();

  const onDeleteFileTag = async () => {
    await deleteFileTag(fileTag.id);
    await queryClient.invalidateQueries({ queryKey: [fileTagQueryKeys.fileId, file.id] });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge className="cursor-pointer mx-0.5" >{fileTag.tag.name}</Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Tag Search</DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteFileTag}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
