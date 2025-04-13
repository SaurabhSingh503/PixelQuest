import React from 'react';
import { motion } from 'framer-motion';

const PixelTitle = ({ text }) => {
  return (
    <motion.h1
      className="pixel-title"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="pixel-char"
          animate={{
            y: [0, -10, 0],
            textShadow: [
              '0 0 8px rgba(0,255,102,0.5)',
              '0 0 16px rgba(0,255,102,0.8)',
              '0 0 8px rgba(0,255,102,0.5)'
            ]
          }}
          transition={{
            delay: index * 0.05,
            duration: 1.5,
            repeat: Infinity
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default PixelTitle;
