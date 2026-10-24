import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter } from "react-router-dom";
import PlayerProvider from './components/contexts/PlayerProvider.tsx';
import UserProvider from './components/contexts/UserProvider.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </PlayerProvider>
    </BrowserRouter>
  </StrictMode>,
)
