import { useState } from 'react';
import { CodeOutputProps, CodeFormat } from '../types/code';

export default function CodeOutput({ 
  colors, 
  format,
  onFormatChange
}: CodeOutputProps) {
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    switch (format) {
      case 'tailwind':
        return `module.exports = {
  theme: {
    extend: {
      colors: {
${colors.map((color, index) => `        ${index === 0 ? 'primary' : 'color' + (index + 1)}: '${color}',`).join('\n')}
      }
    }
  }
};`;
      case 'css':
        return `:root {
${colors.map((color, index) => `  --color-${index + 1}: ${color};`).join('\n')}
}`;
      case 'sass':
        return colors.map((color, index) => `$color-${index + 1}: ${color};`).join('\n');
      case 'less':
        return colors.map((color, index) => `@color-${index + 1}: ${color};`).join('\n');
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
