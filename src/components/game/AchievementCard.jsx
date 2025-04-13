import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@context/GameContext';

const AchievementCard = ({ achievement, unlocked }) => {
  const { playSoundEffect } = useAudio();

  return (
    <motion.div 
      className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => playSoundEffect('collect')}
    >
      <div className="card-content">
        <div className="achievement-icon">
          {unlocked ? (
            <span role="img" aria-label="trophy">🏆</span>
          ) : (
            <span role="img" aria-label="locked">🔒</span>
          )}
        </div>

        <div className="achievement-info">
          <h3 className="title">
            {unlocked ? achievement.title : 'Locked Achievement'}
          </h3>
          <p className="description">
            {unlocked ? achievement.description : 'Complete challenges to unlock'}
          </p>
          {unlocked && (
            <div className="progress">
              <span className="points">+{achievement.points} XP</span>
            </div>
          )}
        </div>

        {unlocked && (
          <div className="shine-effect"></div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementCard; 
