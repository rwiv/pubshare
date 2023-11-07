import {useEffect} from 'react';
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {deleteFile, mkdir} from "@/client/access/accessClient.ts";
import {Button} from "@/components/ui/button.tsx";
import {Tree} from "@/components/file/tree/Tree.tsx";
import {FileTable} from "@/components/file/table/FileTable.tsx";
// import viteLogo from '/vite.svg'

export function MainPage() {
  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();

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
      <FileTable className="m-3" />
      <Button onClick={onMkdir}>mkdir</Button>
      <Button onClick={onRmdir}>rmdir</Button>
      <Tree />
    </MainTemplate>
  );
}
