import React from 'react';
import { motion } from 'framer-motion';

const GameMap = ({ map }) => {
  return (
    <div className="game-map">
      {map.map((row, y) => (
        <div key={`row-${y}`} className="map-row">
          {row.map((tile, x) => (
            <motion.div
              key={`tile-${x}-${y}`}
              className={`map-tile map-tile--${tile.type} ${tile.variant ? `map-tile--${tile.type}-${tile.variant}` : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (x + y) * 0.01 }}
            >
              {tile.type === 'collectible' && tile.collected && (
                <div className="collectible-shadow"></div>
              )}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameMap;
