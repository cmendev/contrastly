import { useState } from 'react';

export function useThemeSelector(
  onBackgroundChange: (color: string) => void,
  onTextChange: (color: string) => void,
  onReset: () => void
) {
  const [selectedBg, setSelectedBg] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBackgroundSelect = (color: string) => {
    setSelectedBg(color);
    onBackgroundChange(color);
  };

  const handleTextSelect = (color: string) => {
    setSelectedText(color);
    onTextChange(color);
  };

  const resetSelections = () => {
    setSelectedBg(null);
    setSelectedText(null);
    onReset();
  };

  return {
    selectedBg,
    selectedText,
    isOpen,
    setIsOpen,
    handleBackgroundSelect,
    handleTextSelect,
    resetSelections,
  };
}
