import { createContext, useContext, useState, ReactNode } from 'react';
import { PLATFORMS, PLATFORM_CONFIG, PlatformKey, PlatformColors, PlatformConfig } from '../constants/platforms';

interface ThemeContextType {
  isDarkMode: boolean;
  isMobileMode: boolean;
  currentPlatform: PlatformKey;
  setCurrentPlatform: (platform: PlatformKey) => void;
  toggleDarkMode: () => void;
  toggleMobileMode: () => void;
  getCurrentTheme: () => PlatformColors;
  getCurrentPlatformConfig: () => PlatformConfig;
  platformOptions: PlatformKey[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false);
  const [currentPlatform, setCurrentPlatform] = useState<PlatformKey>(PLATFORMS.WHATSAPP);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleMobileMode = () => {
    setIsMobileMode(prev => !prev);
  };

  const getCurrentTheme = (): PlatformColors => {
    const platform = PLATFORM_CONFIG[currentPlatform];
    return platform.colors[isDarkMode ? 'dark' : 'light'];
  };

  const getCurrentPlatformConfig = (): PlatformConfig => {
    return PLATFORM_CONFIG[currentPlatform];
  };

  const value: ThemeContextType = {
    isDarkMode,
    isMobileMode,
    currentPlatform,
    setCurrentPlatform,
    toggleDarkMode,
    toggleMobileMode,
    getCurrentTheme,
    getCurrentPlatformConfig,
    platformOptions: Object.values(PLATFORMS) as PlatformKey[]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 