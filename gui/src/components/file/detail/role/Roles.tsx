import {useFileRoleCreateDialog} from "@/components/file/detail/role/useFileRoleCreateDialog.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {FileRoleResponse} from "@/client/permission/types";
import {deleteFileRole, fileRoleQueryKeys, findFileRolesByFileId} from "@/client/permission/fileRoleClient.ts";
import {FileResponse} from "@/client/access/types.ts";
import {FileHeader} from "@/components/file/detail/common/FileHeader.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Badge} from "@/components/ui/badge.tsx";

interface RolesProps {
  file: FileResponse;
  className?: string;
}

export function Roles({ file, className }: RolesProps) {

  const {setOpen, component} = useFileRoleCreateDialog(file.id);
  const {data: fileRoles} = useQuery<FileRoleResponse[]>({
    queryKey: [fileRoleQueryKeys.fileId, file.id],
    queryFn: ctx => findFileRolesByFileId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  return (
    <div className={className}>
      <FileHeader title="Roles" onAdd={() => setOpen(true)} />
      <div className="flex flex-wrap my-2">
        {fileRoles.map(fileRole => (
          <Role key={fileRole.id} fileRole={fileRole} file={file} />
        ))}
      </div>
      {component}
    </div>
  )
}


interface RoleProps {
  fileRole: FileRoleResponse;
  file: FileResponse;
  className?: string;
}

function Role({ fileRole, file }: RoleProps) {

  const queryClient = useQueryClient();

  const onDelete = async () => {
    await deleteFileRole(fileRole.id);
    await queryClient.invalidateQueries({ queryKey: [fileRoleQueryKeys.fileId, file.id] });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge variant="secondary" className="cursor-pointer mx-1" >{fileRole.role.name}</Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>perm: {fileRole.permission}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
