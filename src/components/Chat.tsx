import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { DeviceFrameset } from 'react-device-frameset';
import { useTheme } from '../hooks/useTheme';
import {
  ChatHeader,
  ProfilePhotos,
  ProfilePhoto,
  DefaultProfilePhoto,
  ChatInfo,
  ChatTitle,
  ChatStatus,
  MessagesContainer,
  MessageBubble,
  MessageTime,
  MessageGroup,
  ChatInputContainer,
  ChatInput,
  SendButton
} from '../styles/ChatStyles';

interface Message {
  text: string;
  sender: 'sender' | 'receiver';
  timestamp: Date;
}

interface MessageGroupType {
  sender: 'sender' | 'receiver';
  messages: Message[];
  timestamp: Date;
}

interface ChatProps {
  messages: Message[];
  senderName: string;
  receiverName: string;
  senderPhoto: string;
  receiverPhoto: string;
}

const Chat: React.FC<ChatProps> = ({ messages, senderName, receiverName, senderPhoto, receiverPhoto }) => {
  const [chatInput, setChatInput] = useState<string>('');
  const { getCurrentTheme, getCurrentPlatformConfig, isMobileMode } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const theme = getCurrentTheme();
  const platformConfig = getCurrentPlatformConfig();
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const groupMessages = (messages: Message[]): MessageGroupType[] => {
    const groups: MessageGroupType[] = [];
    let currentGroup: MessageGroupType | null = null;

    messages.forEach((message) => {
      if (!currentGroup || currentGroup.sender !== message.sender) {
        currentGroup = {
          sender: message.sender,
          messages: [message],
          timestamp: message.timestamp
        };
        groups.push(currentGroup);
      } else {
        currentGroup.messages.push(message);
      }
    });

    return groups;
  };

  const messageGroups = groupMessages(messages);

  const renderChatContent = () => (
    <>
      <ChatHeader theme={theme}>
        <ProfilePhotos>
          {receiverPhoto ? (
            <ProfilePhoto src={receiverPhoto} alt={receiverName} theme={theme} />
          ) : (
            <DefaultProfilePhoto theme={theme}>
              {receiverName.charAt(0).toUpperCase()}
            </DefaultProfilePhoto>
          )}
        </ProfilePhotos>
        <ChatInfo>
          <ChatTitle>{receiverName}</ChatTitle>
          <ChatStatus>
            {platformConfig.name === 'WhatsApp' ? 'online' : 'Active now'}
          </ChatStatus>
        </ChatInfo>
      </ChatHeader>

      <MessagesContainer theme={theme}>
        {messageGroups.map((group, groupIndex) => (
          <MessageGroup key={groupIndex} isSender={group.sender === 'sender'}>
            {group.messages.map((message, messageIndex) => (
              <MessageBubble
                key={`${groupIndex}-${messageIndex}`}
                isSender={group.sender === 'sender'}
                isFirst={messageIndex === 0}
                isLast={messageIndex === group.messages.length - 1}
                theme={theme}
                platform={platformConfig.name.toLowerCase()}
              >
                {message.text}
                {messageIndex === group.messages.length - 1 && (
                  <MessageTime theme={theme}>
                    {formatTime(message.timestamp)}
                  </MessageTime>
                )}
              </MessageBubble>
            ))}
          </MessageGroup>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <ChatInputContainer theme={theme}>
        <ChatInput
          theme={theme}
          type="text"
          placeholder="Type a message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              // This is just for UI - actual message handling is in parent component
            }
          }}
        />
        <SendButton theme={theme}>
          <Send size={16} />
        </SendButton>
      </ChatInputContainer>
    </>
  );

  if (isMobileMode) {
    return (
      <div 
        id="mobile-download-container"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 40px', // More padding for download
          backgroundColor: '#f5f5f5' // Light background for download
        }}
      >
        <div 
          id="mobile-device-frame"
          style={{
            // Calculate the maximum size that fits while maintaining aspect ratio
            width: Math.min(390, window.innerWidth - 80, (window.innerHeight - 280) * (390/844)) + 'px',
            aspectRatio: '390/844', // This will set height automatically based on width
            borderRadius: '47px', // iPhone 14 corner radius
            overflow: 'hidden',
            backgroundColor: theme.background,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {renderChatContent()}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {renderChatContent()}
    </div>
  );
};

export default Chat; 