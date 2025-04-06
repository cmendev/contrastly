export interface AccessibilityCheckerProps {
    colors: string[];
}

export interface ContrastResult {
    foreground: string;
    background: string;
    ratio: number;
    aa: boolean;
    aaa: boolean;
    largeAa: boolean;
    largeAaa: boolean;
}

export interface ColorSelectorProps {
    label: string;
    colors: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
}