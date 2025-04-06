export interface ThemeSelectorProps {
    colors: string[];
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
