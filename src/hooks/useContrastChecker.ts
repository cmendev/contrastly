import { useEffect, useState } from 'react';
import { calculateContrastRatio, hexToRgb } from '../services/colorUtils';
import { ContrastResult } from '../types/accessibility';
import { useToastHelper } from '../lib/toast/useToastHelpers';

export function useContrastChecker(colors: string[]) {
  const [results, setResults] = useState<ContrastResult[]>([]);
  const toast = useToastHelper();

  useEffect(() => {
    if (colors.length >= 2) {
      const newResults: ContrastResult[] = [];
      for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < colors.length; j++) {
          if (i !== j) {
            const ratio = calculateContrastRatio(hexToRgb(colors[i]), hexToRgb(colors[j]));
            newResults.push({
              foreground: colors[i],
              background: colors[j],
              ratio,
              aa: ratio >= 4.5,
              aaa: ratio >= 7,
              largeAa: ratio >= 3,
              largeAaa: ratio >= 4.5,
            });
          }
        }
      }
      setResults(newResults);
      toast.success(`${newResults.length} contrast combinations were evaluated`);
    } else {
      setResults([]);
      toast.warning('You must select at least 2 colors to evaluate contrast');
    }
  }, [colors]);

  return results;
}
