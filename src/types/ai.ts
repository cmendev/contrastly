export interface AISuggestionsProps {
    colors: string[];
    onPaletteUpdate: (colors: string[]) => void;
    paletteSize: number;
}

export type AccessibilityLevel = 'AA' | 'AAA';
