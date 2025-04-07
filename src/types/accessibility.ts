import { ColorItem } from "./code";

export interface AccessibilityCheckerProps {
    colors: ColorItem[];
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
    colors: ColorItem[];
    selectedIndex: number;
    onChange: (index: number) => void;
}