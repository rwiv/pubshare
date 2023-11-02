import {useEffect, useState} from 'react';
import {_, HStack} from '../util/csshelper/cssHelper.ts';
import { Button } from '@/components/ui/button.tsx';
import { FileTable } from '../components/table/FileTable.tsx';
import {ContextMenuBoundary} from "@/components/ctxmenu/ContextMenuBoundary.tsx";
import {ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu.tsx";
import {AppHeader} from "@/components/header/AppHeader.tsx";
import {AccessClient, FileInfo} from "@/client/AccessClient.ts";
import {AccountClient} from "@/client/AccountClient.ts";
import {AccountResponse} from "../../../src/domain/account/domain/types";
import {FileResponse} from "@/components/table/types";
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

  const left = _.m_all(1,1,2,2,3,3);
  const center = _.m_all(10,10,8, 8,6,6);
  const right = _.m_all(1,1,2,2,3,3);

  const [count, setCount] = useState(0);

  const [files, setFiles] = useState<FileInfo[]>([]);
  const [users, setUsers] = useState<AccountResponse[]>([]);

  useEffect(() => {
    const userClient = new AccountClient();
    userClient.create({
      email: `hello${Date.now().toString()}@gmail.com`,
      password: "1234",
      certified: false,
    });
  }, []);

  useEffect(() => {
    const accessClient = new AccessClient();
    accessClient.list().then(infos => {
      setFiles(infos);
    });

    const userClient = new AccountClient();
    userClient.findByAll().then(users => {
      setUsers(users)
    })
  }, []);

  return (
    <>
      <AppHeader />
      <HStack>
        <div css={left}/>
        <div css={center}>
          {users.map(user => <div key={user.id}>{user.email}</div>)}
          <Button
            css={_.m(2)}
            onClick={() => {
              setCount(count + 1);
            }}
          >
            hello
          </Button>
          <span>{count}</span>
          <ContextMenuBoundary menuContent={<MenuContent />}>
            <FileTable files={files.map(file => convertFile(file))} />
          </ContextMenuBoundary>
        </div>
        <div css={right}/>
      </HStack>
    </>
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
