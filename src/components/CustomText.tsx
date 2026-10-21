import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  variant?: 'pixel' | 'normal';
}

export default function CustomText({ children, variant = 'pixel', style, ...props }: CustomTextProps) {
  return (
    <Text 
      style={[
        variant === 'pixel' ? styles.pixelText : styles.normalText, 
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  pixelText: {
    fontFamily: 'PressStart2P', // Aplica la fuente descargada de Google Fonts
    color: '#000000',
  },
  normalText: {
    fontFamily: 'System',
  },
});
