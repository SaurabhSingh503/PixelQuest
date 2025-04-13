import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

const Footer = () => {
  const { toggleMute, isMuted } = useAudio();

  return (
    <motion.footer
      className="main-footer"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h4>PixelQuest</h4>
          <p>© 2024 Retro Game Studios</p>
          <p>All rights reserved</p>
        </div>

        <div className="footer-section">
          <h4>Links</h4>
          <ul className="footer-links">
            <li><a href="/about">About</a></li>
            <li><a href="/collection">Collection</a></li>
            <li><a href="/game">Play</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Settings</h4>
          <button 
            className={`mute-button ${isMuted ? 'muted' : ''}`}
            onClick={toggleMute}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Created with ❤️ for the Hackathon</p>
        <div className="pixel-divider"></div>
        <p>Best viewed in Chrome/Firefox</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
