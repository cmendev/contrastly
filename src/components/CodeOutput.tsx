import { useState } from 'react';
import { CodeOutputProps, CodeFormat, ColorFormat } from '../types/code';
import { formatColor } from '../utils/colorFormatters';

export default function CodeOutput({
  colors,
  format,
  colorFormat,
  onFormatChange,
  onColorFormatChange
}: CodeOutputProps) {

  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    const output: string[] = [];
  
    switch (format) {
      case 'tailwind':
        colors.forEach((color) => {
          const baseName = color.name.toLowerCase().replace(/\s+/g, '-');
          output.push(`--color-${baseName}: ${formatColor(color.color, colorFormat)};`);
        });
        return output.join('\n');
  
      case 'css':
        output.push(`:root {`);
        colors.forEach((color) => {
          const baseName = color.name.toLowerCase().replace(/\s+/g, '-');
          output.push(`  --color-${baseName}: ${formatColor(color.color, colorFormat)};`);
        });
        output.push(`}`);
        return output.join('\n');
  
      case 'sass':
        return colors.map((color) =>
          `$color-${color.name.toLowerCase().replace(/\s+/g, '-')}: ${formatColor(color.color, colorFormat)};`
        ).join('\n');
  
      case 'less':
        return colors.map((color) =>
          `@color-${color.name.toLowerCase().replace(/\s+/g, '-')}: ${formatColor(color.color, colorFormat)};`
        ).join('\n');
  
      default:
        return '';
    }
  };
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-purple-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-900">Code Output</h2>
        <div className="flex gap-2">
          <select
            value={format}
            onChange={(e) => onFormatChange(e.target.value as CodeFormat)}
            className="px-2 py-1 text-sm rounded border border-purple-200 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="css">CSS</option>
            <option value="sass">Sass</option>
            <option value="less">Less</option>
            <option value="tailwind">Tailwind</option>
          </select>
          <select
            value={colorFormat}
            onChange={(e) => onColorFormatChange(e.target.value as ColorFormat)}
            className="px-2 py-1 text-sm rounded border border-purple-200"
          >
            <option value="hex">Hex</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
          </select>

          <button
            onClick={copyToClipboard}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors duration-200"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <pre className="bg-purple-50 rounded-lg p-4 overflow-auto text-sm text-purple-900 font-mono">
        {generateCode()}
      </pre>
    </div>
  );
}
