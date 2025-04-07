import { useState } from 'react';
import { generateColorPalette } from '../services/aiService';
import { AISuggestionsProps, AccessibilityLevel } from '../types/ai';
import { useToast } from '../lib/toast/context';
import { ColorItem } from '../types/code';

export default function AISuggestions({
  colors,
  onPaletteUpdate,
  paletteSize
}: AISuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [accessibilityLevel, setAccessibilityLevel] = useState<AccessibilityLevel>('AA');
  const [replaceExisting, setReplaceExisting] = useState(false);
  const { addToast } = useToast();

  const handleGenerateSuggestions = async () => {
    if (colors.length === 0) {
      addToast('You must select at least one base color to generate the palette.', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      const palette = await generateColorPalette({
        baseColors: colors.map(c => c.color), // pasamos solo los valores
        paletteSize,
        accessibilityLevel
      });

      const newColors: ColorItem[] = palette.map((c) => ({
        name: c.name,
        color: c.color
      }));

      const updatedColors: ColorItem[] = replaceExisting
        ? [...newColors]
        : [
            ...colors,
            ...newColors.filter(nc => !colors.some(ec => ec.color === nc.color))
          ];

      onPaletteUpdate(updatedColors);
      addToast('Palette generated successfully.', 'success');
    } catch (error) {
      console.error('Error generating palette:', error);
      addToast('An error occurred while generating the palette. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-purple-100 p-6 space-y-4">
      <h2 className="text-xl font-bold text-purple-900">AI Palette Generator</h2>

      <div>
        <label className="block text-sm font-medium text-purple-800 mb-1">Accessibility Level</label>
        <select
          value={accessibilityLevel}
          onChange={(e) => setAccessibilityLevel(e.target.value as AccessibilityLevel)}
          className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="AA">AA (Minimum contrast)</option>
          <option value="AAA">AAA (Enhanced contrast)</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="replace-existing"
          checked={replaceExisting}
          onChange={(e) => setReplaceExisting(e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
        />
        <label htmlFor="replace-existing" className="ml-2 text-sm text-purple-800">
          Replace existing colors
        </label>
      </div>

      <button
        onClick={handleGenerateSuggestions}
        disabled={isLoading || colors.length === 0}
        className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : 'Generate Palette'}
      </button>

      <p className="text-xs text-purple-600">
        {replaceExisting
          ? "Will replace current colors with new palette"
          : "Will add new colors to current palette"}
      </p>
    </div>
  );
}
