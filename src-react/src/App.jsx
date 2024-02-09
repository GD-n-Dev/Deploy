import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [path, setPath] = useState("");

  const getConfig = async () => {
    invoke('get_config').then((res) => console.log(res)).catch((err) => console.error(err));
  }

  return (
    <>
    <div style={{ height: '100%', display: 'flex', placeContent: 'center', alignItems: 'center' }}>
      <div>
        <input className='form-input' value={path} onChange={(e) => {
          const {target: {id, name, value}} = e;
          setPath(value);
        }} placeholder='Deployment Location' />
        <button className='button' onClick={() => {}}>Browse</button>
      </div>
      <div>
        <button className='button' onClick={() => {
          toast.info('Deployment started');
        }}>Deploy</button>
        <button className='button' onClick={() => {}}>Revert to stable version</button>
      </div>
    </div>
    <ToastContainer theme="dark"/>
    </>
  );
};

export default App;
