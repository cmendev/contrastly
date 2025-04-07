import { useState } from 'react';
import { useContrastChecker } from '../hooks/useContrastChecker';
import ResultRow from './ResultRow';
import ColorSelector from './ColorSelector';
import { AccessibilityCheckerProps } from '../types/accessibility';


export default function AccessibilityChecker({ colors }: AccessibilityCheckerProps) {
  const [selectedPair, setSelectedPair] = useState<[number, number]>([0, 1]);
  const results = useContrastChecker(colors.map(c => c.color));

  const currentResult = results.find(
    (r) =>
      r.foreground === colors[selectedPair[0]].color &&
    r.background === colors[selectedPair[1]].color
  );

  if (colors.length < 2) return null;

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-purple-100 p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Accessibility Checker</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <ColorSelector
          label="Foreground"
          colors={colors}
          selectedIndex={selectedPair[0]}
          onChange={(val) => setSelectedPair([val, selectedPair[1]])}
        />
        <ColorSelector
          label="Background"
          colors={colors}
          selectedIndex={selectedPair[1]}
          onChange={(val) => setSelectedPair([selectedPair[0], val])}
        />
      </div>

      {currentResult && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-purple-50 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-purple-800">Contrast Ratio</span>
            <span className="text-lg font-bold text-purple-900">
              {currentResult.ratio.toFixed(2)}:1
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <ResultRow label="WCAG AA (Normal)" value={currentResult.aa} />
            <ResultRow label="WCAG AAA (Normal)" value={currentResult.aaa} />
            <ResultRow label="WCAG AA (Large)" value={currentResult.largeAa} />
            <ResultRow label="WCAG AAA (Large)" value={currentResult.largeAaa} />
          </div>

          <div
            className="rounded-xl border-2 border-purple-100 p-5 text-center transition-all duration-200"
            style={{
              backgroundColor: currentResult.background,
              color: currentResult.foreground,
            }}
          >
            <p className="text-lg font-semibold">Sample Text</p>
            <p className="text-sm opacity-80 mt-1">This is how your text might look</p>
          </div>
        </div>
      )}
    </div>
  );
}
