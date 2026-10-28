import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter } from "react-router-dom";
import PlayerProvider from './components/contexts/PlayerProvider.tsx';
import UserProvider from './components/contexts/UserProvider.tsx';
import App from './App.tsx'
import ToastProvider from './components/contexts/ToastProvider.tsx';
import SettingsProvider from './components/contexts/SettingsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <PlayerProvider>
          <UserProvider>
          <SettingsProvider>
              <App />
          </SettingsProvider>
          </UserProvider>
        </PlayerProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
