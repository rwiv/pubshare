import {useEffect, useState} from 'react';
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {FileTree} from "@/components/file/tree/FileTree.tsx";
import {FileTable} from "@/components/file/table/FileTable.tsx";
import {FileDetail} from "@/components/file/detail/FileDetail.tsx";
import {useAccessStore} from "@/stores/accessStore.ts";
import {getMediaQuery} from "@/util/getMediaQuery.ts";
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {FixedScrollArea} from "@/components/common/FixedScrollArea.tsx";
// import viteLogo from '/vite.svg'

const {left, center, right} = getMediaQuery();

export function MainPage() {

  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();
  const {curFile} = useAccessStore();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    login({
      username: "admin",
      password: "admin",
    }).then(res=> {
      setToken(res.accessToken);
      queryClient.invalidateQueries({
        queryKey: [accountQueryKeys.me]
      });
    });
  }, [queryClient, setToken]);

  return (
    <MainTemplate height={height} setHeight={setHeight}>
      <div css={left} className="bg-muted/60">
        <FileTree className="p-3" />
      </div>
      <div css={center}>
        <FileTable className="p-3" />
      </div>
      <div css={right}>
        <FixedScrollArea maxHeight={height}>
          {curFile && (
            <FileDetail className="p-3" file={curFile} />
          )}
        </FixedScrollArea>
      </div>
    </MainTemplate>
  );
}
