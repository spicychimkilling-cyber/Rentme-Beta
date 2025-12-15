import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

import './styles/globals.css';
import './index.css';
import './style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter>
        <App />
        <Toaster richColors closeButton />
      </HashRouter>
    </AuthProvider>
  </React.StrictMode>
);
