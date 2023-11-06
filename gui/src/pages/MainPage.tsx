import {useEffect, useState} from 'react';
import { FileTable } from '../components/table/filev1/FileTable.tsx';
import {ContextMenuBoundary} from "@/components/ctxmenu/ContextMenuBoundary.tsx";
import {ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu.tsx";
import {AccessClient, FileInfo} from "@/client/access/AccessClient.ts";
import {FileResponse} from "@/components/table/filev1/types";
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, getMyData, login} from "@/client/account/accountClient.ts";
import {AccountResponse} from "@/client/account/types.ts";
import {HttpError} from "@/client/common/HttpError.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
// import viteLogo from '/vite.svg'

function convertFile(info: FileInfo): FileResponse {
  return {
    type: info.isDirectory ? "directory" : "file",
    name: info.key,
    modified: info.lastModified,
    size: info.size,
  }
}

export function MainPage() {
  const {data: me, error} = useQuery<unknown, HttpError, AccountResponse>({
    queryKey: [accountQueryKeys.me], queryFn: getMyData, retry: 0,
  });

  const [files, setFiles] = useState<FileInfo[]>([]);

  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();

  useEffect(() => {
    const accessClient = new AccessClient();
    accessClient.list().then(infos => {
      setFiles(infos);
    });

    login({
      email: "admin",
      password: "admin",
    }).then(res=> {
      setToken(res.accessToken);
      queryClient.invalidateQueries({
        queryKey: [accountQueryKeys.me]
      });
    });
  }, [queryClient, setToken]);

  return (
    <MainTemplate>
      {me && me.email}
      {error&& error.message}
      <ContextMenuBoundary menuContent={<MenuContent />}>
        <FileTable files={files.map(file => convertFile(file))} />
      </ContextMenuBoundary>
    </MainTemplate>
  );
}

function MenuContent() {
  return (
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  );
}
