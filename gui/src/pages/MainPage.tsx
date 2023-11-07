import {useEffect} from 'react';
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {useMyData} from "@/hooks/useMyData.tsx";
import {deleteFile, mkdir} from "@/client/access/accessClient.ts";
import {Button} from "@/components/ui/button.tsx";
import {Tree} from "@/components/tree/Tree.tsx";
import {FileTable} from "@/components/table/file/FileTable.tsx";
// import viteLogo from '/vite.svg'

export function MainPage() {
  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();
  const {data: me, error} = useMyData();

  useEffect(() => {
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

  const onMkdir = async () => {
    const key = "hello/testdir/";
    await mkdir({ key });
  }

  const onRmdir = async () => {
    const key = "hello/testdir/";
    await deleteFile({ key });
  }

  return (
    <MainTemplate>
      <div>
        {me && me.email}
        {error&& error.message}
      </div>
      <FileTable />
      <Button onClick={onMkdir}>mkdir</Button>
      <Button onClick={onRmdir}>rmdir</Button>
      <Tree />
    </MainTemplate>
  );
}
