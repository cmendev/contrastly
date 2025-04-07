import { useState } from 'react';
import ColorPicker from './components/ColorPicker';
import ColorPalette from './components/ColorPalette';
import CodeOutput from './components/CodeOutput';
import AISuggestions from './components/AISuggestions';
import AccessibilityChecker from './components/AccessibilityChecker';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';
import { CodeFormat, ColorFormat, ColorItem } from './types/code';
import ColorPaletteLinear from './components/ColorPaletteLinear';

function App() {
  const [colors, setColors] = useState<ColorItem[]>([
    { color: '#7e22ce', name: 'purple-800' },
    { color: '#a855f7', name: 'purple-500' },
    { color: '#d8b4fe', name: 'purple-200' }
  ]);
  const [selectedFormat, setSelectedFormat] = useState<CodeFormat>('tailwind');
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex');
  const [paletteSize, setPaletteSize] = useState<number>(5);

  const {
    theme,
    setCustomBackground,
    setCustomTextColor,
    resetTheme,
    getBackgroundStyle,
    getTextStyle
  } = useTheme();

  const addColor = (color: ColorItem) => {
    if (!colors.some(c => c.name === color.name)) {
      setColors([...colors, color]);
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updatePalette = (newColors: ColorItem[]) => {
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
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C5.373 0 0 5.373 0 12a12.01 12.01 0 008.207 11.385c.6.111.82-.26.82-.577v-2.05c-3.338.727-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.833 2.81 1.303 3.495.996.108-.775.42-1.304.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.526.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 013.003-.404c1.02.005 2.047.137 3.003.404 2.29-1.552 3.295-1.23 3.295-1.23.654 1.65.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.431.372.816 1.103.816 2.222v3.293c0 .32.218.694.825.576A12.01 12.01 0 0024 12c0-6.627-5.373-12-12-12z"
          />
        </svg>
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
        <ColorPaletteLinear 
          baseColor={colors[0]?.color || '#7e22ce'}  
        />

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
            colorFormat={colorFormat}
            onColorFormatChange={setColorFormat}
            onFormatChange={setSelectedFormat}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
