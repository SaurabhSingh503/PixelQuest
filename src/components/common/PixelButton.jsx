import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

const PixelButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  ...props 
}) => {
  const { playSoundEffect } = useAudio();
  
  const handleClick = (e) => {
    if (disabled) return;
    
    playSoundEffect('collect');
    
    if (onClick) {
      onClick(e);
    }
  };
  
  const buttonClasses = `
    pixel-button 
    pixel-button--${variant} 
    pixel-button--${size} 
    ${disabled ? 'pixel-button--disabled' : ''}
    ${className}
  `;
  
  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={disabled ? {} : { 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      <span className="pixel-button__content">{children}</span>
    </motion.button>
  );
};

export default PixelButton;
