import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MessageCircle, Camera } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { PLATFORM_CONFIG, PlatformKey } from '../constants/platforms';
import {
  PlatformSelector as StyledPlatformSelector,
  PlatformDropdown,
  PlatformOption
} from '../styles/GlobalStyles';

const PlatformSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentPlatform, setCurrentPlatform } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentConfig = PLATFORM_CONFIG[currentPlatform];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlatformChange = (platformKey: PlatformKey) => {
    setCurrentPlatform(platformKey);
    setIsOpen(false);
  };

  const getPlatformIcon = (platform: PlatformKey) => {
    switch (platform) {
      case 'whatsapp':
        return <MessageCircle size={20} color="#25d366" />;
      case 'instagram':
        return <Camera size={20} color="#e4405f" />;
      default:
        return <MessageCircle size={20} />;
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <StyledPlatformSelector onClick={() => setIsOpen(!isOpen)}>
        {getPlatformIcon(currentPlatform)}
        <span>{currentConfig.name}</span>
        <ChevronDown 
          size={16}
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </StyledPlatformSelector>
      
      {isOpen && (
        <PlatformDropdown>
          {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
            <PlatformOption
              key={key}
              onClick={() => handlePlatformChange(key as PlatformKey)}
            >
              {getPlatformIcon(key as PlatformKey)}
              <span>{config.name}</span>
            </PlatformOption>
          ))}
        </PlatformDropdown>
      )}
    </div>
  );
};

export default PlatformSelector; 