import React from 'react';
import { motion } from 'framer-motion';

const TILE_SIZE = 32; // Pixel size of each tile

const GameCharacter = ({ position, direction, isMoving }) => {
  const characterX = position.x * TILE_SIZE;
  const characterY = position.y * TILE_SIZE;
  
  // Animation frames for character in different directions
  const spritePositions = {
    down: isMoving ? [0, 1, 0, 2] : [0],
    up: isMoving ? [3, 4, 3, 5] : [3],
    left: isMoving ? [6, 7, 6, 8] : [6],
    right: isMoving ? [9, 10, 9, 11] : [9],
  };
  
  // Get current animation frames based on direction
  const frames = spritePositions[direction] || spritePositions.down;
  
  return (
    <motion.div
      className="game-character"
      style={{
        x: characterX,
        y: characterY,
        transition: { type: 'spring', damping: 15, stiffness: 120 }
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <div 
        className={`character-sprite direction-${direction} ${isMoving ? 'is-moving' : ''}`} 
        style={{ 
          animationPlayState: isMoving ? 'running' : 'paused' 
        }}
      />
      <div className="character-shadow"></div>
    </motion.div>
  );
};

export default GameCharacter;
