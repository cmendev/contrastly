import * as culori from 'culori';

export function formatColor(color: string, format: 'hex' | 'rgb' | 'hsl'): string {
  const parsed = culori.parse(color);
  if (!parsed) return color;

  switch (format) {
    case 'hex':
      return culori.formatHex(parsed);
    case 'rgb':
      return culori.formatRgb(parsed);
    case 'hsl':
      return culori.formatHsl(parsed);
    default:
      return color;
  }
}
