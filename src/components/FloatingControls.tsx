import React from 'react';
import styled from 'styled-components';
import PlatformSelector from './PlatformSelector';
import Settings from './Settings';
import DownloadButton from './DownloadButton';

const FloatingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const ControlsWidget = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #e0e0e0;
`;

const FloatingControls: React.FC = () => {
  return (
    <FloatingContainer>
      <ControlsWidget>
        <PlatformSelector />
        <Divider />
        <Settings />
        <DownloadButton />
      </ControlsWidget>
    </FloatingContainer>
  );
};

export default FloatingControls; 