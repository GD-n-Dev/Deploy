import React, { useEffect, useState } from 'react';

const BITBUCKET_OAUTH_URL = 'https://bitbucket.org/site/oauth2/authorize';
const CLIENT_ID = 'myId';
const CLIENT_SECRET = 'mySecret';
const REDIRECT_URI = 'http://localhost:3000';

const exchangeCodeForToken = async (code) => {
  const url = 'https://bitbucket.org/site/oauth2/access_token';
  const params = new URLSearchParams();

  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET); // Securely manage this

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok) {
      return data.access_token;
    } else {
      console.error('Error exchanging code for token:', data);
      return null;
    }
  } catch (error) {
    console.error('Error exchanging code for token', error);
    return null;
  }
};

const makeApiRequest = async (accessToken) => {
  const url = 'https://api.bitbucket.org/2.0/repositories/{workspace}';
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok) {
      // Process the response data
      console.log(data);
    } else {
      console.error('Error making API request:', data);
    }
  } catch (error) {
    console.error('Error making API request', error);
  }
};

const App = () => {
  if (window.location.href.startsWith(REDIRECT_URI)) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const token = exchangeCodeForToken(code);

    token
      .then((res) => {
        makeApiRequest(res);
      })
      .catch((err) => console.log(err));
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
