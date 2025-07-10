import styled from 'styled-components';

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

interface MessageBubbleProps extends ThemeProps {
  isSender: boolean;
  isFirst: boolean;
  isLast: boolean;
  platform: string;
}

interface MessageGroupProps {
  isSender: boolean;
}



export const ChatHeader = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.primary === '#ffffff' ? props.theme.text : 'white'};
  gap: 12px;
  border-bottom: ${props => props.theme.primary === '#ffffff' ? '1px solid #e0e0e0' : 'none'};
  flex-shrink: 0; /* Prevent shrinking */
  min-height: 70px; /* Ensure consistent height */
`;

export const ProfilePhotos = styled.div`
  display: flex;
  gap: 8px;
`;

export const ProfilePhoto = styled.img<ThemeProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.primary === '#ffffff' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.3)'};
`;

export const DefaultProfilePhoto = styled.div<ThemeProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary === '#ffffff' ? '#f0f0f0' : 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primary === '#ffffff' ? props.theme.text : 'white'};
  font-size: 18px;
  font-weight: bold;
  border: 2px solid ${props => props.theme.primary === '#ffffff' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.3)'};
`;

export const ChatInfo = styled.div`
  flex: 1;
`;

export const ChatTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

export const ChatStatus = styled.p`
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
`;

export const MessagesContainer = styled.div<ThemeProps>`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: ${props => props.theme.background};
  min-height: 0; /* Allow shrinking */
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  /* Ensure space for input area */
  @media screen and (max-width: 400px) {
    padding-bottom: 10px;
  }
`;

export const MessageBubble = styled.div<MessageBubbleProps>`
  max-width: 70%;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 18px;
  word-wrap: break-word;
  position: relative;
  
  ${props => props.isSender ? `
    background-color: ${props.theme.senderBubble};
    color: ${props.platform === 'instagram' ? 'white' : props.theme.text};
    margin-left: auto;
    border-bottom-right-radius: ${props.isLast ? '4px' : '18px'};
  ` : `
    background-color: ${props.theme.receiverBubble};
    color: ${props.theme.text};
    margin-right: auto;
    border-bottom-left-radius: ${props.isLast ? '4px' : '18px'};
  `}
  
  ${props => props.isFirst && `
    margin-top: 8px;
  `}
`;

export const MessageTime = styled.div<ThemeProps>`
  font-size: 11px;
  color: ${props => props.theme.textSecondary};
  margin-top: 4px;
  text-align: right;
`;

export const MessageGroup = styled.div<MessageGroupProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  
  ${props => props.isSender ? `
    align-items: flex-end;
  ` : `
    align-items: flex-start;
  `}
`;

export const ChatInputContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: ${props => props.theme.inputBackground};
  border-top: 1px solid ${props => props.theme.primary}20;
  gap: 10px;
  flex-shrink: 0; /* Prevent shrinking */
  min-height: 70px; /* Ensure consistent height */
  
  /* Ensure visibility in mobile screenshots */
  @media screen and (max-width: 400px) {
    padding: 12px 16px;
    min-height: 60px;
  }
`;

export const ChatInput = styled.input<ThemeProps>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 25px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 14px;
  outline: none;
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

export const SendButton = styled.button<ThemeProps>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.theme.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  svg {
    font-size: 18px;
  }
`;

export const MobileChatContainer = styled.div`
  width: 375px;
  height: 812px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50px;
  padding: 4px;
  box-shadow: 
    0 0 0 8px rgba(0, 0, 0, 0.1),
    0 0 0 12px rgba(0, 0, 0, 0.05),
    0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 35px;
    background: #000;
    border-radius: 0 0 25px 25px;
    z-index: 20;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 6px;
    background: #333;
    border-radius: 3px;
    z-index: 21;
  }
`;

export const MobileScreen = styled.div<ThemeProps>`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.background};
  border-radius: 46px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
`;

export const MobileStatusBar = styled.div<ThemeProps>`
  height: 54px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.primary === '#ffffff' ? props.theme.text : 'white'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
  padding-top: 10px;
  
  &::before {
    content: '9:41';
    font-weight: 600;
  }
  
  &::after {
    content: '100%';
    font-size: 16px;
    font-weight: 600;
  }
`;

export const MobileHomeIndicator = styled.div<ThemeProps>`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 134px;
  height: 5px;
  background-color: ${props => props.theme.primary === '#ffffff' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.6)'};
  border-radius: 3px;
`; 