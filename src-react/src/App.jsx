import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';

const checkIsGitInstalled = async () => await invoke('check_git_installed');

const App = () => {
  const [isGitInstalled, setIsGitInstalled] = useState(false);

  useEffect(() => {
    const installed = checkIsGitInstalled();

    installed.then((res) => setIsGitInstalled(res)).catch((err) => console.log(err));
  }, []);

  return <>{isGitInstalled ? <h1>App</h1> : <h2>No App</h2>}</>;
};

export default App;
