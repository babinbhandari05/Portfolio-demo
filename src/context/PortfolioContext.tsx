import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, PersonalInfo } from '../types';
import { projects as initialProjectsList } from '../data/projects';
import { personalInfo as initialPersonalInfo } from '../data/personalInfo';
import { sounds } from '../components/common/SoundEffects';
import { ToastMessage } from '../components/common/Toast';

interface PortfolioContextType {
  projects: Project[];
  personalInfo: PersonalInfo;
  soundEnabled: boolean;
  toggleSound: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const SOUND_STORAGE_KEY = 'portfolio_sound_enabled';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always read directly from code source files for instant code editing & hot reloading
  const projects = initialProjectsList;
  const personalInfo = initialPersonalInfo;

  // Audio Sound FX state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    sounds.setEnabled(soundEnabled);
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(soundEnabled));
    } catch (e) {
      console.error(e);
    }
  }, [soundEnabled]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (nextVal) {
      sounds.setEnabled(true);
      sounds.playSuccess();
      addToast("Sound effects enabled", "info");
    } else {
      sounds.setEnabled(false);
      addToast("Sound effects muted", "info");
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        personalInfo,
        soundEnabled,
        toggleSound,
        toasts,
        addToast,
        dismissToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
