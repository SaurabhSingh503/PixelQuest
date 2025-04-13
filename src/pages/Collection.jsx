import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
// Corrected import paths (if using alias)
import CollectibleCard from '@components/game/CollectibleCard';
import AchievementCard from '@components/game/AchievementCard';
import PixelTabs from '@components/common/PixelTabs';


const Collection = () => {
  const { collectedItems, unlockedAchievements, collectibles, achievements } = useGame();
  const [activeTab, setActiveTab] = useState('collectibles');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  // Calculate collection completion percentage
  const collectionPercentage = Math.round((collectedItems.length / collectibles.length) * 100);
  const achievementsPercentage = Math.round((unlockedAchievements.length / achievements.length) * 100);
  
  const tabs = [
    { id: 'collectibles', label: 'Collectibles' },
    { id: 'achievements', label: 'Achievements' }
  ];
  
  return (
    <motion.div 
      className="collection-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="collection-header">
        <h1 className="page-title">Your Collection</h1>
        <p className="completion-status">
          {activeTab === 'collectibles' ? (
            <>Collectibles: {collectedItems.length}/{collectibles.length} ({collectionPercentage}%)</>
          ) : (
            <>Achievements: {unlockedAchievements.length}/{achievements.length} ({achievementsPercentage}%)</>
          )}
        </p>
      </div>
      
      <PixelTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />
      
      <motion.div 
        className="collection-grid"
        variants={containerVariants}
      >
        {activeTab === 'collectibles' ? (
          collectibles.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <CollectibleCard 
                item={item} 
                collected={collectedItems.includes(item.id)} 
              />
            </motion.div>
          ))
        ) : (
          achievements.map(achievement => (
            <motion.div key={achievement.id} variants={itemVariants}>
              <AchievementCard 
                achievement={achievement} 
                unlocked={unlockedAchievements.includes(achievement.id)} 
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default Collection;
