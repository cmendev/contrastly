import { ThemeSelectorProps } from '../types/theme';
import { useThemeSelector } from '../hooks/useThemeSelector';

export default function ThemeSelector({
  colors,
  onBackgroundChange,
  onTextChange,
  onReset,
  isCustomTheme
}: ThemeSelectorProps) {
  const {
    selectedBg,
    selectedText,
    isOpen,
    setIsOpen,
    handleBackgroundSelect,
    handleTextSelect,
    resetSelections,
  } = useThemeSelector(onBackgroundChange, onTextChange, onReset);

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-purple-100 p-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold text-purple-900">Theme Customizer</h2>
        <svg
          className={`w-5 h-5 text-purple-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-purple-800 mb-2">Background Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((colorObj, index) => (
                <button
                  key={`bg-${index}`}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedBg === colorObj.color ? 'border-purple-600 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: colorObj.color }}
                  onClick={() => handleBackgroundSelect(colorObj.color)}
                  aria-label={`Select ${colorObj.name} as background`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-purple-800 mb-2">Text Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((colorObj, index) => (
                <button
                  key={`text-${index}`}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedText === colorObj.color ? 'border-purple-600 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: colorObj.color }}
                  onClick={() => handleTextSelect(colorObj.color)}
                  aria-label={`Select ${colorObj.name} as text color`}
                />
              ))}
            </div>
          </div>

          {isCustomTheme && (
            <button
              onClick={resetSelections}
              className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium rounded-lg transition-colors duration-200 mt-2"
            >
              Reset to Default Theme
            </button>
          )}

          <div className="pt-2 border-t border-purple-100">
            <p className="text-xs text-purple-600">
              Tip: Select colors with good contrast for best readability
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
