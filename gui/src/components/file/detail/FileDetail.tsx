import {HStack, VStack} from "@/util/css/layoutComponents.ts";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon} from "@radix-ui/react-icons";
import {FileRoleResponse} from "@/client/permission/types";
import {deleteFileRole, fileRoleQueryKeys, findFileRolesByFileId} from "@/client/permission/fileRoleClient.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useFileRoleCreateDialog} from "@/components/file/detail/useFileRoleCreateDialog.tsx";
import {FileResponse} from "@/client/access/types.ts";

interface FileDetailProps {
  className?: string;
  file: FileResponse;
}

export function FileDetail({ className, file }: FileDetailProps) {

  const queryClient = useQueryClient();
  const {setOpen, component} = useFileRoleCreateDialog(file.id);
  const {data: fileRoles} = useQuery<FileRoleResponse[]>({
    queryKey: [fileRoleQueryKeys.fileId, file.id],
    queryFn: ctx => findFileRolesByFileId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  const onDelete = async (fileRoleId: number) => {
    await deleteFileRole(fileRoleId);
    await queryClient.invalidateQueries({ queryKey: [fileRoleQueryKeys.fileId, file.id] });
  }

  return (
    <VStack className={className}>
      <div>id: {file.id}</div>
      <div>path: {file.path}</div>
      <div>member permission: {file.memberDefaultPerm}</div>
      <div>guest permission: {file.guestDefaultPerm}</div>
      <div>my permission: {file.myPerm}</div>
      <h1>Roles</h1>
      {fileRoles.map(fileRole => (
        <HStack key={fileRole.id}>
          <h2 className="m-1">{fileRole.role.name}</h2>
          <Button
            asChild variant="ghost" size="icon"
            className="h-9 w-9 rounded-full cursor-pointer"
            css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
            onClick={() => onDelete(fileRole.id)}
          >
            <Cross1Icon className="p-2.5" />
          </Button>
        </HStack>
      ))}
      <div>
        <Button onClick={() => setOpen(true)}>Add Role</Button>
      </div>
      {component}
    </VStack>
  )
}
