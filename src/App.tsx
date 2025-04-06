import { useState } from 'react';
import ColorPicker from './components/ColorPicker';
import ColorPalette from './components/ColorPalette';
import CodeOutput from './components/CodeOutput';
import AISuggestions from './components/AISuggestions';
import AccessibilityChecker from './components/AccessibilityChecker';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';

function App() {
  const [colors, setColors] = useState<string[]>(['#7e22ce', '#a855f7', '#d8b4fe']);
  const [selectedFormat, setSelectedFormat] = useState<'css' | 'tailwind' | 'sass' | 'less'>('tailwind');
  const [paletteSize, setPaletteSize] = useState<number>(5);

  const {
    theme,
    setCustomBackground,
    setCustomTextColor,
    resetTheme,
    getBackgroundStyle,
    getTextStyle
  } = useTheme();

  const addColor = (color: string) => {
    if (!colors.includes(color)) {
      setColors([...colors, color]);
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updatePalette = (newColors: string[]) => {
    setColors(newColors);
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${theme.isCustom ? '' : 'bg-gradient-to-br from-purple-50 to-indigo-100'
        }`}
      style={getBackgroundStyle()}
    >
      <a
        href="https://github.com/cmendev/contrastly"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 left-4 flex items-center z-30 space-x-2 bg-black text-white px-3 py-1.5 rounded-full text-sm shadow-md hover:bg-gray-800 transition"
      >
        <img className="w-5 h-5" src="./assets/github-mark-white.svg" alt="Github Logo" />

        <span>View on GitHub</span>
      </a>

      <header className="mb-8 text-center">
        <h1
          className={`text-3xl font-bold mb-2 transition-colors duration-500 ${theme.isCustom ? '' : 'text-purple-900'
            }`}
          style={getTextStyle()}
        >
          Contrastly.♥
        </h1>
        <p
          className={`transition-colors duration-500 ${theme.isCustom ? '' : 'text-purple-700'
            }`}
          style={getTextStyle()}
        >
          Create and test beautiful color palettes
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <ColorPicker
            onColorAdd={addColor}
            paletteSize={paletteSize}
            onPaletteSizeChange={setPaletteSize}
          />

          <AISuggestions
            colors={colors}
            onPaletteUpdate={updatePalette}
            paletteSize={paletteSize}
          />
        </div>

        <div className="space-y-6">
          <ColorPalette
            colors={colors}
            onRemoveColor={removeColor}
          />

          {colors.length >= 2 && (
            <AccessibilityChecker colors={colors} />
          )}
        </div>

        <div className="space-y-6">
          <ThemeSelector
            colors={colors}
            onBackgroundChange={setCustomBackground}
            onTextChange={setCustomTextColor}
            onReset={resetTheme}
            isCustomTheme={theme.isCustom}
          />

          <CodeOutput
            colors={colors}
            format={selectedFormat}
            onFormatChange={setSelectedFormat}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
