import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { Howl } from 'howler';

const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const backgroundMusicRef = useRef(null);
  
  // Initialize background music
  const initBackgroundMusic = useCallback(() => {
    backgroundMusicRef.current = new Howl({
      src: ['/src/assets/audio/background-music.mp3'],
      loop: true,
      volume: volume,
      html5: true,
    });
  }, [volume]);
  
  // Play background music
  const playBackgroundMusic = useCallback(() => {
    if (!backgroundMusicRef.current) {
      initBackgroundMusic();
    }
    
    if (!isMuted) {
      backgroundMusicRef.current.play();
    }
  }, [isMuted, initBackgroundMusic]);
  
  // Stop background music
  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop();
    }
  }, []);
  
  // Play sound effect
  const playSoundEffect = useCallback((soundName) => {
    if (isMuted) return;
    
    const soundEffects = {
      jump: new Howl({ src: ['/src/assets/audio/jump.mp3'], volume: volume }),
      collect: new Howl({ src: ['/src/assets/audio/collect.mp3'], volume: volume }),
      achievement: new Howl({ src: ['/src/assets/audio/achievement.mp3'], volume: volume }),
    };
    
    if (soundEffects[soundName]) {
      soundEffects[soundName].play();
    }
  }, [isMuted, volume]);
  
  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      
      if (backgroundMusicRef.current) {
        if (newMuted) {
          backgroundMusicRef.current.pause();
        } else {
          backgroundMusicRef.current.play();
        }
      }
      
      return newMuted;
    });
  }, []);
  
  // Set volume
  const changeVolume = useCallback((newVolume) => {
    setVolume(newVolume);
    
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume(newVolume);
    }
  }, []);
  
  const value = {
    isMuted,
    volume,
    playBackgroundMusic,
    stopBackgroundMusic,
    playSoundEffect,
    toggleMute,
    changeVolume,
  };
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}
