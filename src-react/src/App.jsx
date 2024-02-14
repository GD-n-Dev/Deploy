import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [path, setPath] = useState('');
  const [config, setConfig] = useState('');

  const getConfig = async () => {
    invoke('get_config').then((res) => setConfig(JSON.parse(res))).catch((err) => console.error(err));
  }

  return (
    <>
    <div style={{ height: '100%', display: 'flex', placeContent: 'center', flexDirection: 'column', alignItems: 'center' }}> 
      <div>
        <button className='button' onClick={() => {
          toast.info('Deployment started');
        }}>Deploy</button>
        <button className='button' onClick={() => {
          toast.success('Reverted to Stable version completed');
        }}>Revert to stable version</button>
      </div>
      <div>
        <p>{config} - config file</p>
      </div>
    </div>
    <ToastContainer theme="dark"/>
    </>
  );
};

export default App;
