import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';



const App = () => {
  const [config, setConfig] = useState({});
  const [gitStatus, setGitStatus] = useState("");

  useEffect(() => {checkGit()}, [])

  const gitPull = async () => {
    invoke('git_pull')
      .then((res) => {
        const result = res;
        console.log('result: ', result);
      }).catch((err) => console.error(err));
  };
  const getConfig = async () => {
    invoke('get_config')
      .then((res) => {
        const result = JSON.parse(res);
        console.log("result: ", result);
        setConfig(result);
      }).catch((err) => console.error(err))
  };

  const checkGit = async () => {
    invoke('check_git_installed')
      .then((res) => {
        const result = res;
        console.log("git result: ", result);
        setGitStatus(result);
      }).catch((err) => console.error(err))
  };


  console.log('config: ', config);

  return (
    <>
      <button onClick={() => gitPull()} style={{ margin: '25px' }}>git pull</button>
      <button onClick={() => getConfig()} style={{ margin: '25px' }}>get config</button>
      <button onClick={() => checkGit()} style={{ margin: '25px' }}>Check Git Version</button>
      <p>{gitStatus}</p>
    </>
  );
};

export default App;
