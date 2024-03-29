import {useFileAuthorityCreateDialog} from "@/components/file/detail/authority/useFileAuthorityCreateDialog.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {FileAuthorityResponse} from "@/client/permission/types";
import {
  deleteFileAuthority,
  fileAuthorityQueryKeys,
  findFileAuthoritiesByFileId
} from "@/client/permission/fileAuthorityClient.ts";
import {FileResponse} from "@/client/access/types.ts";
import {AddableHeader} from "@/components/file/detail/common/AddableHeader.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

interface FileAuthoritiesProps {
  file: FileResponse;
  className?: string;
}

export function FileAuthorities({ file, className }: FileAuthoritiesProps) {

  const {setOpen, component} = useFileAuthorityCreateDialog(file.id);
  const {data: fileAuthorities} = useQuery<FileAuthorityResponse[]>({
    queryKey: [fileAuthorityQueryKeys.fileId, file.id],
    queryFn: ctx => findFileAuthoritiesByFileId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  return (
    <div className={className}>
      <AddableHeader title="Users" onAdd={() => setOpen(true)} />
      <div className="flex flex-wrap my-2">
        {fileAuthorities.map(fileAuthority => (
          <FileAuthority key={fileAuthority.id} fileAuthority={fileAuthority} file={file} />
        ))}
      </div>
      {component}
    </div>
  )
}

interface FileAuthorityProps {
  fileAuthority: FileAuthorityResponse;
  file: FileResponse;
  className?: string;
}

function FileAuthority({ fileAuthority, file }: FileAuthorityProps) {

  const queryClient = useQueryClient();

  const onDelete = async () => {
    await deleteFileAuthority(fileAuthority.id);
    await queryClient.invalidateQueries({ queryKey: [fileAuthorityQueryKeys.fileId, file.id] });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-11 w-11 m-1">
          <AvatarFallback>{fileAuthority.account.nickname}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>perm: {fileAuthority.permission}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

