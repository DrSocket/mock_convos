import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider } from './hooks/useTheme';
import { useTheme } from './hooks/useTheme';
import { GlobalStyle } from './styles/GlobalStyles';
import 'react-device-frameset/styles/marvel-devices.min.css';
import {
  AppContainer,
  LeftPanel,
  AppHeader,
  LeftPanelContent,
  RightPanel,
  ChatContainer,
  FloatingControlsContainer
} from './styles/GlobalStyles';
import InputPanel from './components/InputPanel';
import Chat from './components/Chat';
import FloatingControls from './components/FloatingControls';

interface Message {
  text: string;
  sender: 'sender' | 'receiver';
  timestamp: Date;
}

const AppContent: React.FC = () => {
  const [senderName, setSenderName] = useState<string>('Alice');
  const [receiverName, setReceiverName] = useState<string>('Bob');
  const [senderPhoto, setSenderPhoto] = useState<string>('');
  const [receiverPhoto, setReceiverPhoto] = useState<string>('');
  const [conversationText, setConversationText] = useState<string>('> Hey, how are you? \\(22:12)\n< I\'m good, thanks! How about you?\n> Doing great! Just made 10x on SOL\n< Nice bro, I just made 10x on HBAR \\(22:25)\n> Sweet, lets 10x that shit');
  const [messages, setMessages] = useState<Message[]>([]);

  const { getCurrentTheme, isMobileMode } = useTheme();
  const theme = getCurrentTheme();

  const parseConversation = useCallback(() => {
    const lines = conversationText.split('\n').filter(line => line.trim());
    const parsedMessages: Message[] = [];
    let currentTime = new Date();
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('>')) {
        const content = trimmedLine.substring(1).trim();
        
        // Check for custom time in format \(time)
        const timeMatch = content.match(/\\?\(([^)]+)\)$/);
        let messageText = content;
        let messageTime = currentTime;
        
        if (timeMatch) {
          const timeStr = timeMatch[1];
          // Create a date with the custom time (today's date with custom time)
          const today = new Date();
          const [hours, minutes] = timeStr.split(':').map(Number);
          if (!isNaN(hours) && !isNaN(minutes)) {
            messageTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
            currentTime = messageTime; // Update current time for subsequent messages
          }
          messageText = content.replace(/\\?\([^)]+\)$/, '').trim();
        }
        
        parsedMessages.push({
          text: messageText,
          sender: 'sender',
          timestamp: messageTime
        });
      } else if (trimmedLine.startsWith('<')) {
        const content = trimmedLine.substring(1).trim();
        
        // Check for custom time in format \(time)
        const timeMatch = content.match(/\\?\(([^)]+)\)$/);
        let messageText = content;
        let messageTime = currentTime;
        
        if (timeMatch) {
          const timeStr = timeMatch[1];
          // Create a date with the custom time (today's date with custom time)
          const today = new Date();
          const [hours, minutes] = timeStr.split(':').map(Number);
          if (!isNaN(hours) && !isNaN(minutes)) {
            messageTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
            currentTime = messageTime; // Update current time for subsequent messages
          }
          messageText = content.replace(/\\?\([^)]+\)$/, '').trim();
        }
        
        parsedMessages.push({
          text: messageText,
          sender: 'receiver',
          timestamp: messageTime
        });
      }
    });
    
    setMessages(parsedMessages);
  }, [conversationText]);

  useEffect(() => {
    parseConversation();
  }, [parseConversation]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <LeftPanel>
          <AppHeader>
            <h1>FAKE</h1>
          </AppHeader>
          <LeftPanelContent>
            <InputPanel
              senderName={senderName}
              setSenderName={setSenderName}
              receiverName={receiverName}
              setReceiverName={setReceiverName}
              senderPhoto={senderPhoto}
              setSenderPhoto={setSenderPhoto}
              receiverPhoto={receiverPhoto}
              setReceiverPhoto={setReceiverPhoto}
              conversationText={conversationText}
              setConversationText={setConversationText}
            />
          </LeftPanelContent>
        </LeftPanel>
        
        <RightPanel>
          <ChatContainer id="chat-container" theme={theme} $isMobileMode={isMobileMode}>
            <Chat
              messages={messages}
              senderName={senderName}
              receiverName={receiverName}
              senderPhoto={senderPhoto}
              receiverPhoto={receiverPhoto}
            />
          </ChatContainer>
          
          <FloatingControlsContainer>
            <FloatingControls />
          </FloatingControlsContainer>
        </RightPanel>
      </AppContainer>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
};

export default App; 