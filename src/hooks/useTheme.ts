import { useState } from 'react';
import { Theme } from '../types/theme';
import { useToastHelper } from '../lib/toast/useToastHelpers';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>({
    background: 'from-purple-50 to-indigo-100',
    text: 'purple-900',
    isCustom: false,
  });

  const toast = useToastHelper();

  const setCustomBackground = (bgColor: string) => {
    setTheme((prev) => ({
      ...prev,
      background: bgColor,
      isCustom: true,
    }));
    toast.info(`Background color updated to ${bgColor}`);
  };

  const setCustomTextColor = (textColor: string) => {
    setTheme((prev) => ({
      ...prev,
      text: textColor,
      isCustom: true,
    }));
    toast.info(`Text color updated to ${textColor}`);
  };

  const resetTheme = () => {
    setTheme({
      background: 'from-purple-50 to-indigo-100',
      text: 'purple-900',
      isCustom: false,
    });
    toast.success('Theme reset to default settings');
  };

  const getBackgroundStyle = () => {
    return theme.isCustom ? { background: theme.background } : {};
  };

  const getTextStyle = () => {
    return theme.isCustom ? { color: theme.text } : {};
  };

  return {
    theme,
    setCustomBackground,
    setCustomTextColor,
    resetTheme,
    getBackgroundStyle,
    getTextStyle,
  };
}
