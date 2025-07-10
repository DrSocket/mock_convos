import React, { useState, useRef, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import {
  IconButton,
  DropdownContainer,
  SettingsDropdown,
  SettingItem,
  ToggleSwitch
} from '../styles/GlobalStyles';

const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDarkMode, isMobileMode, toggleDarkMode, toggleMobileMode } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  const handleToggleMobileMode = () => {
    toggleMobileMode();
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <SettingsIcon size={18} />
      </IconButton>
      
      {isOpen && (
        <SettingsDropdown>
          <SettingItem>
            <span>Dark Mode</span>
            <ToggleSwitch 
              active={isDarkMode} 
              onClick={handleToggleDarkMode}
            />
          </SettingItem>
          <SettingItem>
            <span>Mobile View</span>
            <ToggleSwitch 
              active={isMobileMode} 
              onClick={handleToggleMobileMode}
            />
          </SettingItem>
        </SettingsDropdown>
      )}
    </DropdownContainer>
  );
};

export default Settings; 