import { useState } from 'react';
import { _ } from '../util/csshelper/cssHelper.ts';
import { Button, Menu } from '@mantine/core';
import { FileTable } from '../components/table/FileTable.tsx';
import { FileResponse } from '../components/table/types';
import { CtxMenuBoundary } from '../components/ctxmenu/CtxMenuBoundary.tsx';
// import viteLogo from '/vite.svg'
// import './App.css';

const files: FileResponse[] = [
  { type: 'file', name: 'hello1', modified: '2000-01-01', size: 100 },
  { type: 'file', name: 'hello2', modified: '2000-01-01', size: 100 },
  { type: 'file', name: 'hello3', modified: '2000-01-01', size: 100 },
];

export function MainPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div css={[_.color('blue'), _.p(2)]}>hello world!</div>
      <Button
        css={_.m(2)}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        hello
      </Button>
      <div>{count}</div>
      <CtxMenuBoundary menuContent={<MenuContent />}>
        <FileTable files={files} />
      </CtxMenuBoundary>
    </>
  );
}

function MenuContent() {
  return (
    <Menu opened={true}>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Messages</Menu.Item>
        <Menu.Item>Gallery</Menu.Item>
        <Menu.Item>Search</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item>Transfer my data</Menu.Item>
        <Menu.Item color="red">Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
