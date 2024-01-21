import React from 'react';
import { open } from '@tauri-apps/api/dialog';

const App = () => {
  const clickHandler = async () => {
    const selectedFiles = await open({
      title: 'Select your file',
    });

    console.log(selectedFiles);
  };

  return (
    <>
      <button onClick={clickHandler}>select files</button>
    </>
  );
};

export default App;
