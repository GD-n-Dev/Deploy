import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root');
console.log(root);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
);
