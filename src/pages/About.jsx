import React from 'react';
import { motion } from 'framer-motion';
import PixelButton from '../components/common/PixelButton';

const About = () => {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about-content">
        <h1 className="page-title">About PixelQuest</h1>
        
        <div className="about-section">
          <h2>The Adventure Begins</h2>
          <p>
            PixelQuest is a retro-style platformer that takes you back to the golden age of 8-bit gaming. 
            Explore vibrant pixel art worlds, collect rare items, and unlock achievements in this 
            browser-based adventure.
          </p>
        </div>

        <div className="about-section">
          <h2>Development Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="pixel-avatar avatar-1"></div>
              <h3>Lead Developer</h3>
              <p>Code Wizard & System Architect</p>
            </div>
            <div className="team-member">
              <div className="pixel-avatar avatar-2"></div>
              <h3>Pixel Artist</h3>
              <p>Master of Retro Aesthetics</p>
            </div>
            <div className="team-member">
              <div className="pixel-avatar avatar-3"></div>
              <h3>Game Designer</h3>
              <p>Quest Architect & Mechanics Guru</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Technical Details</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <div className="tech-icon react-icon"></div>
              <h3>React</h3>
              <p>Frontend Framework</p>
            </div>
            <div className="tech-item">
              <div className="tech-icon vite-icon"></div>
              <h3>Vite</h3>
              <p>Build Tool</p>
            </div>
            <div className="tech-item">
              <div className="tech-icon framer-icon"></div>
              <h3>Framer Motion</h3>
              <p>Animations</p>
            </div>
          </div>
        </div>

        <div className="back-button">
          <PixelButton to="/" variant="secondary">
            Back to Home
          </PixelButton>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
