import {useEffect} from 'react';
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {FileTree} from "@/components/file/tree/FileTree.tsx";
import {FileTable} from "@/components/file/table/FileTable.tsx";
import {mq} from "@/util/css/MediaQueryHelper.ts";
import {AppHeader} from "@/components/layout/AppHeader.tsx";
import {HStack} from "@/util/css/layoutComponents.ts";
import {FileDetail} from "@/components/file/detail/FileDetail.tsx";
import {useAccessStore} from "@/stores/accessStore.ts";
// import viteLogo from '/vite.svg'

const left = mq.m_all(1,1,2,2,3,3);
const center = mq.m_all(10,10,8, 8,6,6);
const right = mq.m_all(1,1,2,2,3,3);

export function MainPage() {

  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();
  const {curFile} = useAccessStore();

  useEffect(() => {
    // login({
    //   email: "admin",
    //   password: "admin",
    // }).then(res=> {
    //   setToken(res.accessToken);
    //   queryClient.invalidateQueries({
    //     queryKey: [accountQueryKeys.me]
    //   });
    // });
  }, [queryClient, setToken]);

  return (
    <>
      <AppHeader />
      <HStack>
        <div css={left}>
          <FileTree className="m-3" />
        </div>
        <div css={center}>
          <FileTable className="m-3" />
        </div>
        <div css={right}>
          {curFile && <FileDetail className="m-3"  file={curFile}/>}
        </div>
      </HStack>
    </>
  );
}
