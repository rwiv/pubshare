import {useEffect, useState} from 'react';
import {ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu.tsx";
import {list} from "@/client/access/AccessClient.ts";
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {useMyData} from "@/hooks/useMyData.tsx";
import {FileResponse} from "@/client/access/types.ts";
// import viteLogo from '/vite.svg'

export function MainPage() {
  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();
  const {data: me, error} = useMyData();
  const [files, setFiles] = useState<FileResponse[]>([]);

  useEffect(() => {
    list("").then(files => {
      setFiles(files);
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
      {files.length > 0 ? (
        files.map(file => (<div key={file.id}>{file.path}</div>))
      ) : (
        <div>not exists files</div>
      )}
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
