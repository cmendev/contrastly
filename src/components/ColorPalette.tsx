import { ColorPaletteProps } from "../types/color";

export default function ColorPalette({ colors, onRemoveColor }: ColorPaletteProps) {
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-purple-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-900">Color Palette</h2>
        <span className="text-sm text-purple-600">{colors.length} colors</span>
      </div>

      {colors.length === 0 ? (
        <p className="text-purple-700 text-center py-4">Add some colors to get started</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {colors.map((colorItem, index) => (
            <div key={index} className="group relative">
              <div
                className="w-full h-20 rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: colorItem.color }}
                onClick={() => copyToClipboard(colorItem.color)}
              />
              <div className="mt-1 flex justify-between items-start">
                <span className="text-xs font-mono text-gray-700 truncate">
                  {colorItem.color}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveColor(index);
                  }}
                  className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                >
                  ×
                </button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Click to copy
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
