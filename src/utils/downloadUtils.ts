import html2canvas from 'html2canvas';

export const downloadConversationImage = async (
  elementId: string, 
  filename: string = 'conversation',
  isMobileMode: boolean = false
): Promise<boolean> => {
  try {
    let element: HTMLElement | null;
    
    // In mobile mode, target the device frame directly
    if (isMobileMode) {
      element = document.getElementById('mobile-device-frame');
      if (!element) {
        // Fallback to the main container
        element = document.getElementById(elementId);
      }
    } else {
      element = document.getElementById(elementId);
    }
    
    if (!element) {
      throw new Error('Element not found');
    }

    // For mobile, ensure we capture the full content
    const options = {
      backgroundColor: isMobileMode ? null : '#ffffff',
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      width: element.offsetWidth,
      height: element.offsetHeight,
      ...(isMobileMode && {
        // Mobile-specific options
        windowWidth: element.offsetWidth,
        windowHeight: element.offsetHeight,
        foreignObjectRendering: true,
        removeContainer: false
      })
    };

    const canvas = await html2canvas(element, options);

    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}-${isMobileMode ? 'mobile' : 'desktop'}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error downloading image:', error);
    return false;
  }
}; 