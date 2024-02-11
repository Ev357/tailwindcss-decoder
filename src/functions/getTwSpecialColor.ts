import type { KeyValuePair, RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import type { CssSpecialColor } from "../data/cssSpecialColors";
import { fullConfig } from "../tailwindConfig";

export const getTwSpecialColor = (
  value: CssSpecialColor,
  source?:
    | ResolvableTo<KeyValuePair<string, string>>
    | RecursiveKeyValuePair<string, string>
) => {
  const colors = source !== undefined ? source : fullConfig.theme?.textColor;
  if (!colors) {
    throw Error("colors not set!");
  }

  let twColor: string | undefined;

  for (const [colorType, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      if (value === value) {
        twColor = colorType;
        break;
      }
    }
  }

  if (!twColor) {
    return `[${value}]`;
  }

  return twColor;
};
