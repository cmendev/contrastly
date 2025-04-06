import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorPickerProps } from '../types/color';

export default function ColorPicker({
  onColorAdd,
  paletteSize,
  onPaletteSizeChange
}: ColorPickerProps) {
  const [color, setColor] = useState('#7e22ce');

  const handleAddColor = () => {
    onColorAdd(color);
  };

  const handlePaletteSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPaletteSizeChange(Number(e.target.value));
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-purple-100 p-6 space-y-6">
      <h2 className="text-xl font-bold text-purple-900">Color Picker</h2>

      <div className="flex justify-center">
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="#7e22ce"
        />
        <button
          onClick={handleAddColor}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-purple-800">
          Palette Size: {paletteSize}
        </label>
        <input
          type="range"
          min="3"
          max="12"
          value={paletteSize}
          onChange={handlePaletteSizeChange}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
      </div>
    </div>
  );
}