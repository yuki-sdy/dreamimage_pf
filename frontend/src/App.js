import './App.css';

import React, { useState, useEffect } from "react";
import { Test } from './lib/api/test';

import { Top } from './components/pages/Top';

const App = () => {
  const [ message, setMessage ] = useState();

  const handleTest = async () => {
    const res = await Test();
    console.log(res)
    if(res.status === 200) {
      setMessage(res.data.message);
    }
  }

  useEffect(() => {
    handleTest()
  }, [])

  return (
    <>
      <Top />
      <h1>{message}</h1>
    </>
  );
}

export default App;
