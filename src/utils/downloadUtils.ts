import html2canvas from 'html2canvas';

export const downloadConversationImage = async (
  elementId: string, 
  filename: string = 'conversation',
  isMobileMode: boolean = false
): Promise<boolean> => {
  try {
    // Wait a bit to ensure all styles are applied
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let element: HTMLElement | null;
    
    // In mobile mode, target the container with padding for better download
    if (isMobileMode) {
      element = document.getElementById('mobile-download-container');
      if (!element) {
        // Fallback to the device frame
        element = document.getElementById('mobile-device-frame');
        if (!element) {
          // Final fallback to the main container
          element = document.getElementById(elementId);
        }
      }
    } else {
      element = document.getElementById(elementId);
    }
    
    if (!element) {
      throw new Error('Element not found');
    }

    // Simplified options that work better with styled-components
    const options = {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      height: element.scrollHeight,
      width: element.scrollWidth,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc: Document) => {
        // Ensure input placeholders render correctly
        const inputs = clonedDoc.querySelectorAll('input[placeholder]');
        inputs.forEach((input: any) => {
          if (input.value === '') {
            // Create a pseudo-element to show placeholder text
            const placeholder = input.getAttribute('placeholder');
            input.style.color = '#999';
            input.value = placeholder;
            input.style.fontStyle = 'italic';
            // Ensure proper dimensions
            input.style.height = '44px';
            input.style.lineHeight = '1.2';
            input.style.boxSizing = 'border-box';
            input.style.overflow = 'visible';
          }
        });
      }
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