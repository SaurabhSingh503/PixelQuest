import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Game from './pages/Game';
import Collection from './pages/Collection';
import About from './pages/About';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useAudio } from './context/AudioContext';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  const location = useLocation();
  const { playBackgroundMusic, stopBackgroundMusic } = useAudio();
  
  useEffect(() => {
    // Start background music when app loads
    playBackgroundMusic();
    
    return () => {
      stopBackgroundMusic();
    };
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />  
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
