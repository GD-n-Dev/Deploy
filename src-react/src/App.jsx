import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const BITBUCKET_OAUTH_URL = 'https://bitbucket.org/site/oauth2/authorize';
const CLIENT_ID = 'id';
const REDIRECT_URI = 'redirecturi';

const openFileDialog = async () => {
    try {
        const path = await invoke('open_file_dialog');
        console.log(path);
    } catch (error) {
        console.error('Error: ', error);
    }
}

const sendCodeToBackend = async (code) => {
  try {
    const data = await invoke('exchange_code_for_token', { authCode: { code } });
    console.log(data);
  } catch (error) {
    console.error('Error exchanging code for token', error);
  }
};

const App = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      sendCodeToBackend(code).catch((err) => console.error(err));
    }
  }, [window.location.href]);

  useEffect(() => {
    getConfig();
  }, []);

  const handleClick = () => {
    window.location.href = `${BITBUCKET_OAUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
  };

  const getConfig = async () => {
    const config = await invoke('get_config');
    setConfig(JSON.parse(config));
  };

  const handleClickGetConfig = () => {
      getConfig();
  };

  console.log(config);

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleClickGetConfig}>GetConfig</button>
      <button onClick={() => {openFileDialog()}}>OpenFileDialog</button>
    </>
  );
};

export default App;
