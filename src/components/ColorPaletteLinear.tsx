import chroma from "chroma-js";
import { useState, useEffect } from "react";

type ColorItem = {
  color: string;
  name?: string;
  contrast?: number;
  accessibility?: string;
};

type ColorPaletteLinearProps = {
  baseColor: string;
  colorName?: string;
};

export default function ColorPaletteLinear({ baseColor, colorName }: ColorPaletteLinearProps) {
  const [palette, setPalette] = useState<ColorItem[]>([]);

  useEffect(() => {
    if (chroma.valid(baseColor)) {
      const colors = generatePalette(baseColor);
      setPalette(colors);
    }
  }, [baseColor, colorName]);

  const generatePalette = (color: string): ColorItem[] => {
    // Creamos una escala de 10 colores desde claro a oscuro
    const scale = chroma.scale([
      chroma(color).brighten(3).saturate(0.5),
      color,
      chroma(color).darken(3).desaturate(0.2)
    ]).mode('lch').colors(10);

    return scale.map((c) => {
      const ratio = chroma.contrast(c, '#ffffff') > chroma.contrast(c, '#000000') 
        ? chroma.contrast(c, '#ffffff') 
        : chroma.contrast(c, '#000000');
      
      return {
        color: c,
        contrast: parseFloat(ratio.toFixed(1)),
        accessibility: ratio >= 4.5 ? (ratio >= 7 ? 'AAA' : 'AA') : 'Low'
      };
    });
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const getTextColor = (bgColor: string): string => {
    return chroma.contrast(bgColor, '#000000') > 4.5 ? '#000000' : '#ffffff';
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-purple-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-900">Color Palette Linear: {colorName}</h2>
        <span className="text-sm text-purple-600">{palette.length} shades</span>
      </div>

      {palette.length === 0 ? (
        <p className="text-purple-700 text-center py-4">Invalid base color</p>
      ) : (
        <div className="flex flex-wrap gap-1">
          {palette.map((colorItem, index) => (
            <div key={index} className="group relative flex-1 min-w-[60px]">
              <div
                className="w-full h-20 rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 flex flex-col items-center justify-center"
                style={{ backgroundColor: colorItem.color }}
                onClick={() => copyToClipboard(colorItem.color)}
              >
                <span 
                  className="text-xs font-mono px-1 rounded"
                  style={{ color: getTextColor(colorItem.color) }}
                >
                  {colorItem.color}
                </span>
                {colorItem.contrast && (
                  <span 
                    className="text-[0.6rem] mt-1 rounded"
                    style={{ 
                      color: getTextColor(colorItem.color),
                      backgroundColor: chroma(colorItem.color).alpha(0.3).css()
                    }}
                  >
                    CR: {colorItem.contrast} ({colorItem.accessibility})
                  </span>
                )}
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