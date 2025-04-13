import React from 'react';
import { motion } from 'framer-motion';

const PixelTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="pixel-tabs">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              className="tab-indicator"
              layoutId="tabIndicator"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default PixelTabs;
