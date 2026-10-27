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
      <PlayerProvider>
        <UserProvider>
            <ToastProvider>
          <SettingsProvider>
              <App />
          </SettingsProvider>
            </ToastProvider>
        </UserProvider>
      </PlayerProvider>
    </BrowserRouter>
  </StrictMode>,
)
