import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import GameControls from '../components/game/GameControls';
import GameCharacter from '../components/game/GameCharacter';
import CollectibleItem from '../components/game/CollectibleItem';
import GameMap from '../components/game/GameMap';
import AchievementNotification from '../components/game/AchievementNotification';
import { generateGameMap } from '../utils/mapGenerator';

const Game = () => {
  const { player, updatePlayer, collectItem, collectedItems } = useGame();
  const { playSoundEffect } = useAudio();
  const [gameMap, setGameMap] = useState([]);
  const [characterPosition, setCharacterPosition] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');
  const gameContainerRef = useRef(null);
  
  // Generate game map on component mount
  useEffect(() => {
    const map = generateGameMap(20, 15);
    setGameMap(map);
  }, []);
  
  // Handle character movement
  const moveCharacter = (dx, dy, newDirection) => {
    setDirection(newDirection);
    setIsMoving(true);
    
    // Calculate new position
    const newX = characterPosition.x + dx;
    const newY = characterPosition.y + dy;
    
    // Check if new position is within bounds
    if (newX >= 0 && newX < 20 && newY >= 0 && newY < 15) {
      // Check if new position is walkable
      if (gameMap[newY][newX].type !== 'wall') {
        setCharacterPosition({ x: newX, y: newY });
        updatePlayer({ position: { x: newX, y: newY } });
        
        // Check for collectible at new position
        const tile = gameMap[newY][newX];
        if (tile.type === 'collectible' && !collectedItems.includes(tile.itemId)) {
          collectItem(tile.itemId);
          playSoundEffect('collect');
          
          // Update game map (remove collected item)
          const updatedMap = [...gameMap];
          updatedMap[newY][newX] = { ...tile, type: 'ground', collected: true };
          setGameMap(updatedMap);
          
          // Show achievement notification
          setAchievementMessage(`Collected: ${tile.name}`);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 2000);
        }
      }
    }
    
    // Stop moving animation after a short delay
    setTimeout(() => setIsMoving(false), 200);
  };
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          moveCharacter(0, -1, 'up');
          break;
        case 'ArrowDown':
          moveCharacter(0, 1, 'down');
          break;
        case 'ArrowLeft':
          moveCharacter(-1, 0, 'left');
          break;
        case 'ArrowRight':
          moveCharacter(1, 0, 'right');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [characterPosition, gameMap]);
  
  return (
    <motion.div 
      className="game-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="game-info">
        <div className="player-stats">
          <p>Player: {player.name}</p>
          <p>Score: {player.score}</p>
          <p>Level: {player.level}</p>
        </div>
      </div>
      
      <div className="game-container" ref={gameContainerRef}>
        <GameMap map={gameMap} />
        
        <GameCharacter 
          position={characterPosition} 
          direction={direction} 
          isMoving={isMoving} 
        />
        
        {gameMap.flatMap((row, y) => 
          row.map((tile, x) => 
            tile.type === 'collectible' && !collectedItems.includes(tile.itemId) && (
              <CollectibleItem 
                key={`${x}-${y}`} 
                x={x} 
                y={y} 
                item={tile} 
              />
            )
          )
        )}
        
        {showNotification && (
          <AchievementNotification message={achievementMessage} />
        )}
      </div>
      
      <GameControls onMove={moveCharacter} />
    </motion.div>
  );
};

export default Game;
