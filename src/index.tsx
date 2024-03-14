import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createGlobalStyle } from 'styled-components';
import { HashRouter } from 'react-router-dom';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Nunito Sans", sans-serif;
    font-weight: 400;
    font-size: 24px;
  }
  button {
    outline: none;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Global />
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
