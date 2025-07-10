import styled, { createGlobalStyle } from 'styled-components';

interface ToggleSwitchProps {
  active: boolean;
}

interface ThemeProps {
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
    senderBubble: string;
    receiverBubble: string;
    inputBackground: string;
  };
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f0f0f0;
    overflow: hidden; /* Prevent page scrolling */
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: hidden; /* Prevent page scrolling */
`;

export const LeftPanel = styled.div`
  width: 40%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  overflow: hidden; /* Prevent panel scrolling */
`;

export const AppHeader = styled.div`
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #333;
    letter-spacing: 2px;
  }
`;

export const LeftPanelContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  gap: 20px;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 20px;
  overflow: hidden; /* Prevent panel scrolling */
  min-width: 0; /* Allow shrinking */
`;

export const ChatContainer = styled.div<ThemeProps & { $isMobileMode?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 0; /* Allow shrinking */
  position: relative;
  
  ${props => props.$isMobileMode && `
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 0;
    box-shadow: none;
    border: none;
    padding: 20px;
    max-width: 100%;
    max-height: 100%;
  `}
`;

export const FloatingControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
`;

export const PlatformSelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    font-size: 20px;
  }
`;

export const PlatformDropdown = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-bottom: 4px;
`;

export const PlatformOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  svg {
    font-size: 18px;
  }
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    font-size: 18px;
    color: #666;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const SettingsDropdown = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-bottom: 4px;
  min-width: 180px;
  padding: 8px;
`;

export const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ToggleSwitch = styled.div<ToggleSwitchProps>`
  width: 40px;
  height: 20px;
  background-color: ${props => props.active ? '#25d366' : '#ccc'};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '22px' : '2px'};
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s ease;
  }
`; 