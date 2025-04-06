import OpenAI from "openai";

interface ColorPaletteConfig {
  baseColors: string[];
  paletteSize: number;
  accessibilityLevel: 'AA' | 'AAA';
}

interface ColorSuggestion {
  color: string;
  name: string;
  contrastRatio: number;
  accessibility: 'AA' | 'AAA' | 'Fail';
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export async function generateColorPalette({ 
  baseColors,
  paletteSize, 
  accessibilityLevel 
}: ColorPaletteConfig): Promise<ColorSuggestion[]> {
  const completion = await openai.chat.completions.create({
    messages: [{
      role: "system",
      content: `Generate a harmonious color palette with ${paletteSize} colors that combines these base colors: ${baseColors.join(', ')}. 
      The palette should meet WCAG ${accessibilityLevel} accessibility standards.
      Create colors that work well together considering all the base colors provided.
      Return ONLY a valid JSON array of color objects with hex value, name, contrast ratio and accessibility level.
      Example:
      [{
        "color": "#3b82f6",
        "name": "Blue-500",
        "contrastRatio": 4.5,
        "accessibility": "AA"
      }]`
    }],
    model: "deepseek/deepseek-chat:free",
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No content received from the API");
  }

  try {
    const trimmedContent = content.trim();
    if (!trimmedContent.startsWith("[") || !trimmedContent.endsWith("]")) {
      throw new Error("API response is not a valid JSON array");
    }

    const palette: ColorSuggestion[] = JSON.parse(trimmedContent);
    return palette;
  } catch (error) {
    console.error("Error parsing JSON from API:", error);
    throw new Error("Invalid JSON response from API");
  }
}