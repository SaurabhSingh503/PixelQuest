import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/styles/index.css';
import { GameProvider } from './context/GameContext';
import { AudioProvider } from './context/AudioContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
