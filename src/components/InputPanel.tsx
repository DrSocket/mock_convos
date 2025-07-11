import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

const ParticipantsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ParticipantColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ParticipantLabel = styled.div`
  font-weight: 500;
  color: #666;
  font-size: 14px;
`;

const PhotoUpload = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  
  &:hover {
    border-color: #007bff;
  }
`;

const PhotoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const PhotoPlaceholder = styled.div`
  font-size: 10px;
  color: #999;
  text-align: center;
  font-weight: 500;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ConversationContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ConversationTextarea = styled.textarea`
  width: 100%;
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: monospace;
  resize: none;
  overflow-y: auto;
  min-height: 200px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const QuickGuide = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  font-size: 12px;
  color: #666;
  margin-top: 15px;
  
  ul {
    margin: 8px 0 0 0;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 4px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

interface InputPanelProps {
  senderName: string;
  setSenderName: (name: string) => void;
  receiverName: string;
  setReceiverName: (name: string) => void;
  senderPhoto: string;
  setSenderPhoto: (photo: string) => void;
  receiverPhoto: string;
  setReceiverPhoto: (photo: string) => void;
  conversationText: string;
  setConversationText: (text: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({
  senderName,
  setSenderName,
  receiverName,
  setReceiverName,
  senderPhoto,
  setSenderPhoto,
  receiverPhoto,
  setReceiverPhoto,
  conversationText,
  setConversationText
}) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, setPhoto: (photo: string) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <InputContainer>
      <Section>
        <SectionTitle>Participants</SectionTitle>
        
        <ParticipantsContainer>
          <ParticipantColumn>
            <ParticipantLabel>Sender</ParticipantLabel>
            <PhotoUpload onClick={() => document.getElementById('sender-photo')?.click()}>
              {senderPhoto ? (
                <PhotoPreview src={senderPhoto} alt="Sender" />
              ) : (
                <PhotoPlaceholder>Click to<br/>upload</PhotoPlaceholder>
              )}
            </PhotoUpload>
            <NameInput
              type="text"
              placeholder="Sender name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            <HiddenFileInput
              id="sender-photo"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, setSenderPhoto)}
            />
          </ParticipantColumn>

          <ParticipantColumn>
            <ParticipantLabel>Receiver</ParticipantLabel>
            <PhotoUpload onClick={() => document.getElementById('receiver-photo')?.click()}>
              {receiverPhoto ? (
                <PhotoPreview src={receiverPhoto} alt="Receiver" />
              ) : (
                <PhotoPlaceholder>Click to<br/>upload</PhotoPlaceholder>
              )}
            </PhotoUpload>
            <NameInput
              type="text"
              placeholder="Receiver name"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
            <HiddenFileInput
              id="receiver-photo"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, setReceiverPhoto)}
            />
          </ParticipantColumn>
        </ParticipantsContainer>
      </Section>

      <Section>
        <SectionTitle>Conversation</SectionTitle>
        <ConversationContainer>
          <ConversationTextarea
            placeholder="Type your conversation here...&#10;&#10;> Hey, how are you?&#10;< I'm good, thanks! How about you?&#10;> Doing great! Want to grab coffee later?"
            value={conversationText}
            onChange={(e) => setConversationText(e.target.value)}
          />
          <QuickGuide>
            <strong>Quick Guide:</strong>
            <ul>
              <li>Use <code>&gt;</code> for {senderName} messages</li>
              <li>Use <code>&lt;</code> for {receiverName} messages</li>
              <li>Press Enter to create new messages</li>
              <li>Messages auto-alternate direction</li>
              <li>Add custom time: <code>\(22:30)</code> at end of message</li>
              <li>Time persists until next custom time is set</li>
            </ul>
          </QuickGuide>
        </ConversationContainer>
      </Section>
    </InputContainer>
  );
};

export default InputPanel; 