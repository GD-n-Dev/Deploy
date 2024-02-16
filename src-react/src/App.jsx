import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [status, setStatus] = useState('');
  const [config, setConfig] = useState('');

  const getConfig = async () => {
    invoke('get_config').then((res) => {
      setConfig(JSON.parse(res))
      console.log("Get Config: ", JSON.parse(res).Version);
    }).catch((err) => console.error(err));
  }

  const getStatus = async () => {
    invoke('get_status').then((res) => {
      setStatus(res);
      console.log("Get Status: ", res)
    }).catch((err) => console.error(err));
  }

  useEffect(() => {
    getConfig();
    getStatus();
  }, []);

  return (
    <>
      <div style={{ height: '100%', display: 'flex', placeContent: 'center', flexDirection: 'column', alignItems: 'center' }}> 
        <div>
          <p>{status} - Git Status</p>
        </div>
        <div>
          <button className='button' onClick={() => {
            toast.info('Deployment started');
          }}>Deploy</button>
          <button className='button' onClick={() => {
            toast.success('Reverted to Stable version completed');
          }}>Revert to stable version</button>
        </div>
        <div>
          <p>{config.Version} - config file</p>
        </div>
      </div>
      <ToastContainer theme="dark"/>
    </>
  );
};

export default App;
