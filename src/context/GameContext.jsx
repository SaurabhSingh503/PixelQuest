import React, { createContext, useContext, useState, useEffect } from 'react';
import { collectibles } from '../constants/collectibles';
import { achievements } from '../constants/achievements';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  // Player state
  const [player, setPlayer] = useState({
    name: localStorage.getItem('playerName') || 'Player',
    level: parseInt(localStorage.getItem('playerLevel')) || 1,
    score: parseInt(localStorage.getItem('playerScore')) || 0,
    position: { x: 0, y: 0 },
  });
  
  // Collectibles state
  const [collectedItems, setCollectedItems] = useState(
    JSON.parse(localStorage.getItem('collectedItems')) || []
  );
  
  // Achievements state
  const [unlockedAchievements, setUnlockedAchievements] = useState(
    JSON.parse(localStorage.getItem('unlockedAchievements')) || []
  );
  
  // Game settings
  const [settings, setSettings] = useState({
    difficulty: localStorage.getItem('difficulty') || 'normal',
    pixelDensity: localStorage.getItem('pixelDensity') || 'medium',
    colorScheme: localStorage.getItem('colorScheme') || 'default',
  });
  
  // Update player state
  const updatePlayer = (newPlayerData) => {
    setPlayer(prev => ({ ...prev, ...newPlayerData }));
  };
  
  // Collect an item
  const collectItem = (itemId) => {
    // Check if item is already collected
    if (collectedItems.includes(itemId)) return;
    
    // Add item to collected items
    setCollectedItems(prev => [...prev, itemId]);
    
    // Update player score
    const itemValue = collectibles.find(item => item.id === itemId)?.value || 0;
    updatePlayer({ score: player.score + itemValue });
    
    // Check for new achievements
    checkAchievements();
  };
  
  // Check achievements
  const checkAchievements = () => {
    achievements.forEach(achievement => {
      // Skip if already unlocked
      if (unlockedAchievements.includes(achievement.id)) return;
      
      // Check if achievement condition is met
      let isUnlocked = false;
      
      switch (achievement.type) {
        case 'score':
          isUnlocked = player.score >= achievement.requirement;
          break;
        case 'collectibles':
          isUnlocked = collectedItems.length >= achievement.requirement;
          break;
        case 'specific_item':
          isUnlocked = collectedItems.includes(achievement.requirement);
          break;
        default:
          break;
      }
      
      // Unlock achievement if condition is met
      if (isUnlocked) {
        setUnlockedAchievements(prev => [...prev, achievement.id]);
      }
    });
  };
  
  // Update settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('playerName', player.name);
    localStorage.setItem('playerLevel', player.level.toString());
    localStorage.setItem('playerScore', player.score.toString());
    localStorage.setItem('collectedItems', JSON.stringify(collectedItems));
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    localStorage.setItem('difficulty', settings.difficulty);
    localStorage.setItem('pixelDensity', settings.pixelDensity);
    localStorage.setItem('colorScheme', settings.colorScheme);
  }, [player, collectedItems, unlockedAchievements, settings]);
  
  const value = {
    player,
    collectedItems,
    unlockedAchievements,
    settings,
    updatePlayer,
    collectItem,
    updateSettings,
    collectibles,
    achievements,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
