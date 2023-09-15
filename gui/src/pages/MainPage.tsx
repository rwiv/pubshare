import { useState } from 'react';
import {_, HStack} from '../util/csshelper/cssHelper.ts';
import { Button } from '@/components/ui/button.tsx';
import { FileTable } from '../components/table/FileTable.tsx';
import { FileResponse } from '@/components/table/types';
import {ContextMenuBoundary} from "@/components/ctxmenu/ContextMenuBoundary.tsx";
import {ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu.tsx";
import {AppHeader} from "@/components/header/AppHeader.tsx";
// import viteLogo from '/vite.svg'

const files: FileResponse[] = [
  { type: 'file', name: 'hello1', modified: '2000-01-01', size: 100 },
  { type: 'file', name: 'hello2', modified: '2000-01-01', size: 100 },
  { type: 'file', name: 'hello3', modified: '2000-01-01', size: 100 },
];

export function MainPage() {

  const left = _.m_all(1,1,2,2,3,3);
  const center = _.m_all(10,10,8, 8,6,6);
  const right = _.m_all(1,1,2,2,3,3);

  const [count, setCount] = useState(0);

  return (
    <>
      <AppHeader />
      <HStack>
        <div css={left}/>
        <div css={center}>
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
            <FileTable files={files} />
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
