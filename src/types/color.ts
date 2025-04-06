export interface ColorPaletteProps {
    colors: string[];
    onRemoveColor: (index: number) => void;
}

export interface ColorPickerProps {
    onColorAdd: (color: string) => void;
    paletteSize: number;
    onPaletteSizeChange: (size: number) => void;
}