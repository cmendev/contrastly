import { ColorSelectorProps } from "../types/accessibility";

export default function ColorSelector({
    label,
    colors,
    selectedIndex,
    onChange,
}: ColorSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-purple-800 mb-1">{label}</label>
            <select
                value={selectedIndex}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            >
                {colors.map((color, index) => (
                    <option key={index} value={index}>
                        Color {index + 1} ({color})
                    </option>
                ))}
            </select>
        </div>
    );
}
