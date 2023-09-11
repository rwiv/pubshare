import { useState } from 'react';
import { _ } from './util/csshelper/cssHelper.ts';
import { Button } from '@mantine/core';
import {FileTable} from "./components/FileTable.tsx";
// import viteLogo from '/vite.svg'
// import './App.css';

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
      <FileTable />
    </>
  );
}

export default App;
