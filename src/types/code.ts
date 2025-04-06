export type CodeFormat = 'css' | 'tailwind' | 'sass' | 'less';

export interface CodeOutputProps {
  colors: string[];
  format: CodeFormat;
  onFormatChange: (format: CodeFormat) => void;
}
