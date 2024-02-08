import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';


const App = () => {

  return (
    <>
      <button className='button' onClick={() => {}}>Deploy</button>
      <button className='button' onClick={() => {}}>Revert to stable version</button>
      <p>{gitStatus}</p>
    </>
  );
};

export default App;
