import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('> Hello there!\n< Hi! How are you doing?');
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState('person1');
  const [receiverName, setReceiverName] = useState('person2');
  const [senderPhoto, setSenderPhoto] = useState(null);
  const [receiverPhoto, setReceiverPhoto] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const parseMessages = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => {
      const senderMatch = line.match(/^>\s*(.*)$/);
      const receiverMatch = line.match(/^<\s*(.*)$/);
      
      if (senderMatch) {
        return {
          id: index,
          sender: senderName,
          text: senderMatch[1],
          timestamp: new Date(Date.now() - (lines.length - index) * 60000) // Simulate different times
        };
      } else if (receiverMatch) {
        return {
          id: index,
          sender: receiverName,
          text: receiverMatch[1],
          timestamp: new Date(Date.now() - (lines.length - index) * 60000)
        };
      }
      return null;
    }).filter(Boolean);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  const handleConversationKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const textBeforeCursor = inputText.substring(0, cursorPosition);
      const textAfterCursor = inputText.substring(cursorPosition);
      
      // Determine the last message direction
      const lines = textBeforeCursor.split('\n');
      const lastLine = lines[lines.length - 1];
      
      let nextDirection = '> '; // Default to sender
      if (lastLine.startsWith('>')) {
        nextDirection = '< '; // Switch to receiver
      } else if (lastLine.startsWith('<')) {
        nextDirection = '> '; // Switch to sender
      }
      
      const newText = textBeforeCursor + '\n' + nextDirection + textAfterCursor;
      setInputText(newText);
      
      // Set cursor position after the direction indicator
      setTimeout(() => {
        const newCursorPosition = cursorPosition + nextDirection.length + 1;
        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    }
  };

  const handlePhotoUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'sender') {
          setSenderPhoto(e.target.result);
        } else {
          setReceiverPhoto(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = `${senderName}: ${messageInput}`;
      const updatedText = inputText ? `${inputText}\n${newMessage}` : newMessage;
      setInputText(updatedText);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getProfilePhoto = (sender) => {
    if (sender === senderName && senderPhoto) return senderPhoto;
    if (sender === receiverName && receiverPhoto) return receiverPhoto;
    return null;
  };

  const getDisplayName = (sender) => {
    if (sender === senderName) return senderName;
    if (sender === receiverName) return receiverName;
    return sender;
  };

  // Parse messages when inputText, senderName, or receiverName changes
  useEffect(() => {
    setMessages(parseMessages(inputText));
  }, [inputText, senderName, receiverName, parseMessages]);

  return (
    <div className="app">
      <div className="container">
        {/* Left side - Input area */}
        <div className="input-section">
          <h2>Conversation Setup</h2>
          
          {/* Sender and Receiver Setup */}
          <div className="participants-section">
            <div className="participant">
              <label>Sender</label>
              <div className="participant-info">
                <div className="profile-photo-container">
                  <div className="profile-photo" onClick={() => document.getElementById('sender-photo').click()}>
                    {senderPhoto ? (
                      <img src={senderPhoto} alt="Sender" />
                    ) : (
                      <div className="empty-avatar">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="sender-photo"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 'sender')}
                    style={{ display: 'none' }}
                  />
                </div>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="name-input"
                  placeholder="Sender name"
                />
              </div>
            </div>

            <div className="participant">
              <label>Receiver</label>
              <div className="participant-info">
                <div className="profile-photo-container">
                  <div className="profile-photo" onClick={() => document.getElementById('receiver-photo').click()}>
                    {receiverPhoto ? (
                      <img src={receiverPhoto} alt="Receiver" />
                    ) : (
                      <div className="empty-avatar">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="receiver-photo"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 'receiver')}
                    style={{ display: 'none' }}
                  />
                </div>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="name-input"
                  placeholder="Receiver name"
                />
              </div>
            </div>
          </div>

          <div className="conversation-input-section">
            <label>Conversation Script</label>
            <p>Enter your conversation using:</p>
            <code>&gt; message (from {senderName})<br/>&lt; message (from {receiverName})</code>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleConversationKeyPress}
              placeholder={`> Hello there!\n< Hi! How are you doing?`}
              className="conversation-input"
            />
            <div className="quick-guide">
              <strong>Quick Guide:</strong>
              <ul>
                <li>Start line with &gt; for {senderName} and &lt; for {receiverName}</li>
                <li>Press Enter to start a new message (direction auto-alternates)</li>
                <li>Shift + Enter for line breaks within a message</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side - WhatsApp-like conversation */}
        <div className="chat-section">
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-header-avatar">
                {receiverPhoto ? (
                  <img src={receiverPhoto} alt={receiverName} />
                ) : (
                  <div className="empty-avatar small">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="chat-header-info">
                <div className="chat-title">{getDisplayName(receiverName)}</div>
                <div className="chat-status">online</div>
              </div>
            </div>
            
            <div className="chat-messages">
              {messages.map((message, index) => {
                const isFirstMessage = index === 0 || messages[index - 1].sender !== message.sender;
                const isLastMessage = index === messages.length - 1 || messages[index + 1].sender !== message.sender;
                const isFromSender = message.sender === senderName;
                
                return (
                  <div key={message.id} className={`message-container ${isFromSender ? 'sender' : 'receiver'}`}>
                    {isFirstMessage && (
                      <div className="message-avatar">
                        {getProfilePhoto(message.sender) ? (
                          <img src={getProfilePhoto(message.sender)} alt={message.sender} />
                        ) : (
                          <div className="empty-avatar tiny">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                    <div className={`message ${isFirstMessage ? 'first' : ''} ${isLastMessage ? 'last' : ''}`}>
                      {isFirstMessage && <div className="sender-name">{getDisplayName(message.sender)}</div>}
                      <div className="message-text">{message.text}</div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                );
              })}
              {messages.length === 0 && (
                <div className="no-messages">
                  Start typing in the input area to see your conversation here!
                </div>
              )}
            </div>

            <div className="chat-input-area">
              <div className="chat-input-container">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message"
                  className="message-input"
                />
                <button 
                  onClick={handleSendMessage}
                  className="send-button"
                  disabled={!messageInput.trim()}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
