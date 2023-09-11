import { useState } from 'react';
import { _ } from '../util/csshelper/cssHelper.ts';
import { Button } from '@mantine/core';
import {FileTable} from "../components/FileTable.tsx";
import {FileResponse} from "../components/types";
// import viteLogo from '/vite.svg'
// import './App.css';

const files: FileResponse[] = [
  { type: "file", name: "hello1", modified: "2000-01-01", size: 100 },
  { type: "file", name: "hello2", modified: "2000-01-01", size: 100 },
  { type: "file", name: "hello3", modified: "2000-01-01", size: 100 },
]

function App() {
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
      <FileTable files={files}/>
    </>
  );
}

export default App;
