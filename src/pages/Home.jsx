import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import PixelButton from '../components/common/PixelButton';
import PixelTitle from '../components/common/PixelTitle';

const Home = () => {
  const { player } = useGame();
  const { playSoundEffect } = useAudio();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120 }
    }
  };
  
  const handleButtonClick = () => {
    playSoundEffect('collect');
  };
  
  return (
    <motion.div 
      className="home-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-section">
        <motion.div variants={childVariants} className="pixel-art-character"></motion.div>
        
        <motion.div variants={childVariants} className="hero-content">
          <PixelTitle text="PixelQuest" />
          <p className="hero-subtitle">Embark on a retro pixel adventure!</p>
          
          <div className="welcome-message">
            <p>Welcome back, <span className="player-name">{player.name}</span>!</p>
            <p>Current Score: <span className="highlight">{player.score}</span></p>
          </div>
          
          <div className="action-buttons">
            <Link to="/game">
              <PixelButton onClick={handleButtonClick}>Start Adventure</PixelButton>
            </Link>
            <Link to="/collection">
              <PixelButton variant="secondary" onClick={handleButtonClick}>View Collection</PixelButton>
            </Link>
          </div>
        </motion.div>
      </div>
      
      <motion.div variants={childVariants} className="features-section">
        <h2 className="section-title">Game Features</h2>
        
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon pixel-icon-world"></div>
            <h3>Pixel World</h3>
            <p>Explore beautifully crafted pixel art environments</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon pixel-icon-collectibles"></div>
            <h3>Collectibles</h3>
            <p>Discover and collect unique pixel items</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon pixel-icon-achievements"></div>
            <h3>Achievements</h3>
            <p>Unlock special achievements as you progress</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
