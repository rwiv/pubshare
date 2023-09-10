import { useState } from 'react';
import { _ } from './util/csshelper/cssHelper.ts';
// import viteLogo from '/vite.svg'
// import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div css={[_.color('blue'), _.p(2)]}>hello world!</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        hello
      </button>
      <div>{count}</div>
    </>
  );
}

export default App;
