import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PixelButton from '../common/PixelButton';
import { useAudio } from '../../context/AudioContext';

const Navbar = () => {
  const location = useLocation();
  const { playSoundEffect } = useAudio();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/game', label: 'Play' },
    { path: '/collection', label: 'Collection' },
    { path: '/about', label: 'About' },
  ];

  return (
    <motion.nav
      className="main-nav"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-brand">
        <Link to="/" className="logo-link">
          <span className="logo-pixel">P</span>
          <span className="logo-text">ixelQuest</span>
        </Link>
      </div>

      <div className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={() => playSoundEffect('collect')}
          >
            <span className="link-border"></span>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        <PixelButton
          variant="secondary"
          size="small"
          onClick={() => playSoundEffect('collect')}
        >
          🔔 News
        </PixelButton>
      </div>
    </motion.nav>
  );
};

export default Navbar;
