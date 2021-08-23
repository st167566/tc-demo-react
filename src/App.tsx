import React, { ReactElement,useState,useRef,useLayoutEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function useStateWithCallback<T>(initState:T):[T,any]{
  const [state, setState] = useState(initState);
  const cbRef = useRef(() => {
    // do nothing.
  });
  const setStateWithCB = (ns:T, cb = () => {
    // do nothing.
  }) => (cbRef.current = cb) && setState(ns);
  useLayoutEffect(() => cbRef.current(), [state]);
  return [state, setStateWithCB];
}

// 使用的时候:
function TestCallback2():ReactElement{
  const [number1, setNumber] = useStateWithCallback(0);
  const [number2, setNumber2] = useStateWithCallback(99);
  const handleClick1 = () => setNumber(number1 + 1, () => {
    console.log('callback effect 111')
  });
  const handleClick2 = () => setNumber2(number2 - 1, () => {
    console.log('callback effect 222')
  });
  return (
    <div>
      <button onClick={handleClick1}>{number1}</button>
      <button onClick={handleClick2}>{number2}</button>
    </div>
  )
}


function App():ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <TestCallback2 />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
