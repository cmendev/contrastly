export type CodeFormat = 'css' | 'tailwind' | 'sass' | 'less';

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface ColorItem {
  color: string;
  name: string;
  contrastRatio?: number;
  accessibility?: string;
}

export interface CodeOutputProps {
  colors: ColorItem[];
  format: CodeFormat;
  colorFormat: ColorFormat;
  onFormatChange: (format: CodeFormat) => void;
  onColorFormatChange: (format: ColorFormat) => void;
}
