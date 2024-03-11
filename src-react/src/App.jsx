import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConfig, useStatus, useBackup } from './customHooks';
import { invoke } from '@tauri-apps/api';

const App = () => {
  const configHook = useConfig();
  const statusHook = useStatus();
  const backupHook = useBackup();


//  localStorage.setItem("config", statusHook.value);
//  const theme = localStorage.getItem("config");
//  console.log("theme value: ",theme);

  return (
    <>
      <div style={{ height: '100%', display: 'flex', placeContent: 'center', flexDirection: 'column', alignItems: 'center' }}> 
        <div>
          <p>{statusHook.value} - Git Status</p>
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
          <p>{configHook.value} - Configuration</p>
        </div>
        <div>
          <input type='text' placeholder='Source Path' />
          <button className='button' onClick={() => {
            invoke('open_dialog').then((res) => console.log(res)).catch((err) => console.error(err));
          }}>Browse</button>
        </div>
        <div>
          <input type='text' placeholder='Target Path' />
          <button className='button' onClick={() => {
            invoke('open_dialog').then((res) => console.log(res)).catch((err) => console.error(err));
          }}>Browse</button>
        </div>
        <div>
          <p>{backupHook.value} - backup</p>
        </div>
      </div>
      <ToastContainer theme="dark"/>
    </>
  );
};

export default App;
