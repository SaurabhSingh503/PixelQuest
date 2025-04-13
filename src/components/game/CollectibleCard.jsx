import React from 'react';
import { motion } from 'framer-motion';

const CollectibleCard = ({ item, collected }) => {
  return (
    <motion.div 
      className={`collectible-card ${collected ? 'collected' : 'locked'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="card-content">
        {collected ? (
          <>
            <div 
              className="collectible-image" 
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <h3 className="collectible-name">{item.name}</h3>
            <p className="collectible-description">{item.description}</p>
            <div className="collectible-value">Value: {item.value}</div>
          </>
        ) : (
          <>
            <div className="collectible-image locked">
              <span className="lock-icon">?</span>
            </div>
            <h3 className="collectible-name">???</h3>
            <p className="collectible-description">Find this collectible to unlock it!</p>
          </>
        )}
      </div>
      
      {collected && (
        <div className="collectible-shine"></div>
      )}
    </motion.div>
  );
};

export default CollectibleCard;
