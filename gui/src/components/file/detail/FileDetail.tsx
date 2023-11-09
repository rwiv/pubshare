import {HStack, VStack} from "@/util/css/layoutComponents.ts";
import {Button} from "@/components/ui/button.tsx";
import {Cross1Icon} from "@radix-ui/react-icons";
import {FileAuthorityResponse, FileRoleResponse} from "@/client/permission/types";
import {deleteFileRole, fileRoleQueryKeys, findFileRolesByFileId} from "@/client/permission/fileRoleClient.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useFileRoleCreateDialog} from "@/components/file/detail/useFileRoleCreateDialog.tsx";
import {FileResponse} from "@/client/access/types.ts";
import {useFileAuthorityCreateDialog} from "@/components/file/detail/useFileAuthorityCreateDialog.tsx";
import {
  deleteFileAuthority,
  fileAuthorityQueryKeys,
  findFileAuthoritiesByFileId
} from "@/client/permission/fileAuthorityClient.ts";
import {FileCommentList} from "@/components/file/detail/FileCommentList.tsx";

interface FileDetailProps {
  className?: string;
  file: FileResponse;
}

export function FileDetail({ className, file }: FileDetailProps) {

  const queryClient = useQueryClient();
  const {setOpen: setOpenFileRole, component: fileRoleComp} = useFileRoleCreateDialog(file.id);
  const {setOpen: setOpenFileAuthority, component: fileAuthorityComp} = useFileAuthorityCreateDialog(file.id);
  const {data: fileRoles} = useQuery<FileRoleResponse[]>({
    queryKey: [fileRoleQueryKeys.fileId, file.id],
    queryFn: ctx => findFileRolesByFileId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });
  const {data: fileAuthorities} = useQuery<FileAuthorityResponse[]>({
    queryKey: [fileAuthorityQueryKeys.fileId, file.id],
    queryFn: ctx => findFileAuthoritiesByFileId(parseInt(ctx.queryKey[1] as string)),
    initialData: [],
  });

  const onDeleteFileRole = async (fileRoleId: number) => {
    await deleteFileRole(fileRoleId);
    await queryClient.invalidateQueries({ queryKey: [fileRoleQueryKeys.fileId, file.id] });
  }

  const onDeleteFileAuthority = async (fileAuthorityId: number) => {
    await deleteFileAuthority(fileAuthorityId);
    await queryClient.invalidateQueries({ queryKey: [fileAuthorityQueryKeys.fileId, file.id] });
  }

  function FileInfo() {
    return (
      <div>
        <h1>Info</h1>
        <div>id: {file.id}</div>
        <div>path: {file.path}</div>
        <div>member permission: {file.memberDefaultPerm}</div>
        <div>guest permission: {file.guestDefaultPerm}</div>
        <div>my permission: {file.myPerm}</div>
      </div>
    )
  }

  function Roles() {
    return (
      <div>
        <h1>Roles</h1>
        {fileRoles.map(fileRole => (
          <HStack key={fileRole.id}>
            <h2 className="m-1">{fileRole.role.name}: {fileRole.permission}</h2>
            <Button
              asChild variant="ghost" size="icon"
              className="h-9 w-9 rounded-full cursor-pointer"
              css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
              onClick={() => onDeleteFileRole(fileRole.id)}
            >
              <Cross1Icon className="p-2.5" />
            </Button>
          </HStack>
        ))}
        <div>
          <Button onClick={() => setOpenFileRole(true)}>Add Role</Button>
        </div>
        {fileRoleComp}
      </div>
    )
  }

  function Authorities() {
    return (
      <div>
        <h1>Authorities</h1>
        {fileAuthorities.map(fileAuthority => (
          <HStack key={fileAuthority.id}>
            <h2 className="m-1">{fileAuthority.account.nickname}: {fileAuthority.permission}</h2>
            <Button
              asChild variant="ghost" size="icon"
              className="h-9 w-9 rounded-full cursor-pointer"
              css={{ "&:hover": { backgroundColor: "#dfe0e0" } }}
              onClick={() => onDeleteFileAuthority(fileAuthority.id)}
            >
              <Cross1Icon className="p-2.5" />
            </Button>
          </HStack>
        ))}
        <div>
          <Button onClick={() => setOpenFileAuthority(true)}>Add Authority</Button>
        </div>
        {fileAuthorityComp}
      </div>
    )
  }

  return (
    <VStack className={className}>
      <FileInfo />
      <Roles />
      <Authorities />
      <FileCommentList />
    </VStack>
  )
}
