import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NhostReactProvider } from '@nhost/react';
import nhost from './nhost';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NhostReactProvider nhost={nhost}>
      <App />
    </NhostReactProvider>
  </React.StrictMode>
);
