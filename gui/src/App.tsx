import { useState } from 'react';
// import viteLogo from '/vite.svg'
// import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>hello world!</div>
      <div
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </div>
    </>
  );
}

export default App;
