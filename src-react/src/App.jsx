import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useConfig, useStatus } from './customHooks';

const App = () => {
  const configHook = useConfig();
  const statusHook = useStatus();

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
          <p>{configHook.value.Version} - Configuration</p>
        </div>
      </div>
      <ToastContainer theme="dark"/>
    </>
  );
};

export default App;
