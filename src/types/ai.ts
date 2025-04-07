import { ColorItem } from "./code";

export interface AISuggestionsProps {
    colors: ColorItem[];
    onPaletteUpdate: (colors: ColorItem[]) => void;
    paletteSize: number;
}

export type AccessibilityLevel = 'AA' | 'AAA';
