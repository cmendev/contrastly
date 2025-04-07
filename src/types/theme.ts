import { ColorItem } from "./code";

export interface ThemeSelectorProps {
    colors: ColorItem[];
    onBackgroundChange: (color: string) => void;
    onTextChange: (color: string) => void;
    onReset: () => void;
    isCustomTheme: boolean;
}

export interface Theme {
    background: string;
    text: string;
    isCustom: boolean;
}
