import {useEffect, useRef, useState} from 'react';
import {ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu.tsx";
import {MainTemplate} from "@/pages/MainTemplate.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {accountQueryKeys, login} from "@/client/account/accountClient.ts";
import {useTokenStore} from "@/stores/loginStore.ts";
import {useMyData} from "@/hooks/useMyData.tsx";
import {FileResponse} from "@/client/access/types.ts";
import {deleteFile, download, list, mkdir, upload} from "@/client/access/accessClient.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
// import viteLogo from '/vite.svg'

export function MainPage() {
  const queryClient = useQueryClient();
  const {setToken} = useTokenStore();
  const {data: me, error} = useMyData();
  const [files, setFiles] = useState<FileResponse[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    list("hello/").then(files => {
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

  const onDownload = async (file: FileResponse) => {
    if (file.isDirectory) return;
    await download(file.path);
  }

  const onUpload = async () => {
    const file = ref?.current?.files?.item(0);
    if (file === null || file === undefined) {
      throw Error("error");
    }
    const key = "hello/" + file.name;
    await upload({
      key,
      fileCreation: {
        path: key,
        memberDefaultPerm: "KNOWN",
        guestDefaultPerm: "KNOWN",
      },
    }, file);
    console.log("upload");
  }

  const onDelete = async  () => {
    const file = ref?.current?.files?.item(0);
    if (file === null || file === undefined) {
      throw Error("");
    }
    const key = "hello/" + file.name;
    await deleteFile({ key })
    console.log("delete");
  }

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
      <Button onClick={() => {console.log(ref?.current?.files)}}>test</Button>
      {files.length > 0 ? (
        files.map(file => (
          <div key={file.id} onClick={() => onDownload(file)}>{file.path}</div>)
        )
      ) : (
        <div>not exists files</div>
      )}
      <Button onClick={onUpload}>upload</Button>
      <Button onClick={onDelete}>delete</Button>
      <Button onClick={onMkdir}>mkdir</Button>
      <Button onClick={onRmdir}>rmdir</Button>
      <Input type="file" ref={ref} />
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
