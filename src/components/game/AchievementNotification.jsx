import React from 'react';
import { motion } from 'framer-motion';

const AchievementCard = ({ achievement, unlocked }) => {
  return (
    <motion.div 
      className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="card-content">
        {unlocked ? (
          <>
            <div className="achievement-icon">
              <span role="img" aria-label="achievement">🏆</span>
            </div>
            <h3 className="achievement-title">{achievement.title}</h3>
            <p className="achievement-description">{achievement.description}</p>
            <div className="achievement-points">+{achievement.points} pts</div>
          </>
        ) : (
          <>
            <div className="achievement-icon locked">
              <span>🔒</span>
            </div>
            <h3 className="achievement-title">Locked Achievement</h3>
            <p className="achievement-description">Complete challenges to unlock</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementCard;
