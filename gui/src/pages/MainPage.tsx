import {useEffect} from 'react';
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {deleteFile, mkdir} from "@/client/access/accessClient.ts";
import {Button} from "@/components/ui/button.tsx";
import {FileTree} from "@/components/file/tree/FileTree.tsx";
import {FileTable} from "@/components/file/table/FileTable.tsx";
import {mq} from "@/util/css/MediaQueryHelper.ts";
import {AppHeader} from "@/components/layout/AppHeader.tsx";
import {HStack} from "@/util/css/layoutComponents.ts";
import {FileInfo} from "@/components/file/info/FileInfo.tsx";
// import viteLogo from '/vite.svg'

const left = mq.m_all(1,1,2,2,3,3);
const center = mq.m_all(10,10,8, 8,6,6);
const right = mq.m_all(1,1,2,2,3,3);

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
    <>
      <AppHeader />
      <HStack>
        <div css={left}>
          <FileTree className="m-3" />
        </div>
        <div css={center}>
          <FileTable className="m-3" />
          <Button onClick={onMkdir}>mkdir</Button>
          <Button onClick={onRmdir}>rmdir</Button>
        </div>
        <div css={right}>
          <FileInfo className="m-3" />
        </div>
      </HStack>
    </>
  );
}
