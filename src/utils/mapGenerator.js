import { collectibles } from '../constants/collectibles';

// Generate a random game map
export const generateGameMap = (width, height) => {
  const map = [];
  
  // Initialize empty map with ground tiles
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Create border walls
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        row.push({ type: 'wall', variant: getRandomInt(1, 4) });
      } else {
        row.push({ type: 'ground', variant: getRandomInt(1, 5) });
      }
    }
    map.push(row);
  }
  
  // Add random walls
  const numWalls = Math.floor((width * height) * 0.1); // 10% of tiles are walls
  for (let i = 0; i < numWalls; i++) {
    const x = getRandomInt(1, width - 2);
    const y = getRandomInt(1, height - 2);
    
    // Don't place walls at starting position (middle of map)
    if (Math.abs(x - Math.floor(width / 2)) <= 1 && Math.abs(y - Math.floor(height / 2)) <= 1) {
      continue;
    }
    
    map[y][x] = { type: 'wall', variant: getRandomInt(1, 4) };
  }
  
  // Add collectibles
  const numCollectibles = 12; // Number of collectibles to add
  let collectiblesAdded = 0;
  
  while (collectiblesAdded < numCollectibles) {
    const x = getRandomInt(1, width - 2);
    const y = getRandomInt(1, height - 2);
    
    // Only place collectibles on ground tiles
    if (map[y][x].type === 'ground') {
      const collectible = collectibles[collectiblesAdded];
      map[y][x] = { 
        type: 'collectible', 
        itemId: collectible.id,
        name: collectible.name,
        value: collectible.value
      };
      collectiblesAdded++;
    }
  }
  
  return map;
};

// Helper function to get random integer between min and max (inclusive)
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
