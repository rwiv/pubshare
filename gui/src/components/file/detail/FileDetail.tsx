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
import {FileTagResponse} from "@/client/file/types";
import {deleteFileTag, fileTagQueryKeys, findFileTagsByFileId} from "@/client/file/fileTagClient.ts";
import {useFileTagCreateDialog} from "@/components/file/detail/useFileTagCreateDialog.tsx";
import {SmallIconButton} from "@/components/common/SmallIconButton.tsx";
import {useMyData} from "@/hooks/query/accountQueries.tsx";

interface FileDetailProps {
  className?: string;
  file: FileResponse;
}

export function FileDetail({ className, file }: FileDetailProps) {

  const queryClient = useQueryClient();
  const {data: me} = useMyData();

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

  function FileTags() {
    const {setOpen, component} = useFileTagCreateDialog(file.id);
    const {data: fileTags} = useQuery<FileTagResponse[]>({
      queryKey: [fileTagQueryKeys.fileId, file.id],
      queryFn: ctx => findFileTagsByFileId(parseInt(ctx.queryKey[1] as string)),
      initialData: [],
    });

    const onDeleteFileTag = async (fileTagId: number) => {
      await deleteFileTag(fileTagId);
      await queryClient.invalidateQueries({ queryKey: [fileTagQueryKeys.fileId, file.id] });
    }

    return (
      <div>
        <h1>Tags</h1>
        {fileTags.map(fileTag => (
          <HStack key={fileTag.id}>
            <h2 className="m-1">{fileTag.tag.name}</h2>
            <SmallIconButton onClick={() => onDeleteFileTag(fileTag.id)}>
              <Cross1Icon className="p-2.5" />
            </SmallIconButton>
          </HStack>
        ))}
        <div>
          <Button onClick={() => setOpen(true)}>Add Tag</Button>
        </div>
        {component}
      </div>
    )
  }

  function Roles() {
    const {setOpen, component} = useFileRoleCreateDialog(file.id);
    const {data: fileRoles} = useQuery<FileRoleResponse[]>({
      queryKey: [fileRoleQueryKeys.fileId, file.id],
      queryFn: ctx => findFileRolesByFileId(parseInt(ctx.queryKey[1] as string)),
      initialData: [],
    });

    const onDeleteFileRole = async (fileRoleId: number) => {
      await deleteFileRole(fileRoleId);
      await queryClient.invalidateQueries({ queryKey: [fileRoleQueryKeys.fileId, file.id] });
    }

    return (
      <div>
        <h1>Roles</h1>
        {fileRoles.map(fileRole => (
          <HStack key={fileRole.id}>
            <h2 className="m-1">{fileRole.role.name}: {fileRole.permission}</h2>
            <SmallIconButton onClick={() => onDeleteFileRole(fileRole.id)}>
              <Cross1Icon className="p-2.5" />
            </SmallIconButton>
          </HStack>
        ))}
        <div>
          <Button onClick={() => setOpen(true)}>Add Role</Button>
        </div>
        {component}
      </div>
    )
  }

  function Authorities() {
    const {setOpen, component} = useFileAuthorityCreateDialog(file.id);
    const {data: fileAuthorities} = useQuery<FileAuthorityResponse[]>({
      queryKey: [fileAuthorityQueryKeys.fileId, file.id],
      queryFn: ctx => findFileAuthoritiesByFileId(parseInt(ctx.queryKey[1] as string)),
      initialData: [],
    });

    const onDeleteFileAuthority = async (fileAuthorityId: number) => {
      await deleteFileAuthority(fileAuthorityId);
      await queryClient.invalidateQueries({ queryKey: [fileAuthorityQueryKeys.fileId, file.id] });
    }

    return (
      <div>
        <h1>Authorities</h1>
        {fileAuthorities.map(fileAuthority => (
          <HStack key={fileAuthority.id}>
            <h2 className="m-1">{fileAuthority.account.nickname}: {fileAuthority.permission}</h2>
            <SmallIconButton onClick={() => onDeleteFileAuthority(fileAuthority.id)}>
              <Cross1Icon className="p-2.5" />
            </SmallIconButton>
          </HStack>
        ))}
        <div>
          <Button onClick={() => setOpen(true)}>Add Authority</Button>
        </div>
        {component}
      </div>
    )
  }

  return (
    <VStack className={className}>
      <FileInfo />
      <FileTags />
      <Roles />
      <Authorities />
      {me && <FileCommentList file={file} me={me} />}
    </VStack>
  )
}
