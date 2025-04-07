import { ColorItem } from "./code";

export interface ColorPaletteProps {
    colors: ColorItem[];
    onRemoveColor: (index: number) => void;
}

export interface ColorPickerProps {
    onColorAdd: (color: ColorItem) => void;
    paletteSize: number;
    onPaletteSizeChange: (size: number) => void;
}