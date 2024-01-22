import React, { useEffect, useState } from 'react';

const BITBUCKET_OAUTH_URL = 'https://bitbucket.org/site/oauth2/authorize';
const CLIENT_ID = 'key';
const REDIRECT_URI = 'http://localhost:3000';

const App = () => {
  if (window.location.href.startsWith(REDIRECT_URI)) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('getting code', code);
  }

  const handleClick = () => {
    window.location.href = `${BITBUCKET_OAUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
  };

  return (
    <>
      <button onClick={handleClick}>Click me</button>
    </>
  );
};

export default App;
