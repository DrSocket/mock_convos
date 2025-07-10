import { MessageCircle, Camera, LucideIcon } from 'lucide-react';

export const PLATFORMS = {
  WHATSAPP: 'whatsapp',
  INSTAGRAM: 'instagram'
} as const;

export type PlatformKey = typeof PLATFORMS[keyof typeof PLATFORMS];

export interface PlatformColors {
  primary: string;
  secondary: string;
  background: string;
  senderBubble: string;
  receiverBubble: string;
  inputBackground: string;
  text: string;
  textSecondary: string;
}

export interface PlatformConfig {
  name: string;
  icon: LucideIcon;
  colors: {
    light: PlatformColors;
    dark: PlatformColors;
  };
}

export const PLATFORM_CONFIG: Record<PlatformKey, PlatformConfig> = {
  [PLATFORMS.WHATSAPP]: {
    name: 'WhatsApp',
    icon: MessageCircle,
    colors: {
      light: {
        primary: '#075e54',
        secondary: '#25d366',
        background: '#e5ddd5',
        senderBubble: '#dcf8c6',
        receiverBubble: '#ffffff',
        inputBackground: '#f0f0f0',
        text: '#303030',
        textSecondary: '#667781'
      },
      dark: {
        primary: '#2a2f32',
        secondary: '#00a884',
        background: '#0b141a',
        senderBubble: '#005c4b',
        receiverBubble: '#202c33',
        inputBackground: '#2a2f32',
        text: '#e9edef',
        textSecondary: '#8696a0'
      }
    }
  },
  [PLATFORMS.INSTAGRAM]: {
    name: 'Instagram',
    icon: Camera,
    colors: {
      light: {
        primary: '#ffffff',
        secondary: '#405de6',
        background: '#ffffff',
        senderBubble: '#405de6',
        receiverBubble: '#efefef',
        inputBackground: '#fafafa',
        text: '#262626',
        textSecondary: '#8e8e8e'
      },
      dark: {
        primary: '#262626',
        secondary: '#405de6',
        background: '#000000',
        senderBubble: '#405de6',
        receiverBubble: '#262626',
        inputBackground: '#121212',
        text: '#ffffff',
        textSecondary: '#8e8e8e'
      }
    }
  }
}; 