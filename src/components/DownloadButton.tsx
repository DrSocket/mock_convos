import React from 'react';
import { Download } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { downloadConversationImage } from '../utils/downloadUtils';
import { IconButton } from '../styles/GlobalStyles';

const DownloadButton: React.FC = () => {
  const { getCurrentPlatformConfig, isMobileMode } = useTheme();
  
  const handleDownload = async () => {
    const platformConfig = getCurrentPlatformConfig();
    const success = await downloadConversationImage(
      'chat-container', 
      platformConfig.name.toLowerCase(),
      isMobileMode
    );
    
    if (!success) {
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <IconButton onClick={handleDownload} title="Download conversation image">
      <Download size={18} />
    </IconButton>
  );
};

export default DownloadButton; 