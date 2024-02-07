import type { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import { fullConfig } from "../tailwindConfig";

export const getTwColor = (red: string, green: string, blue: string, source: ResolvableTo<RecursiveKeyValuePair<string, string>> | undefined) => {
  const colors = source !== undefined ? source : fullConfig.theme?.colors;
  if (!colors) {
    throw Error("colors not set!");
  }

  const redHex = parseInt(red).toString(16).padStart(2, "0");
  const greenHex = parseInt(green).toString(16).padStart(2, "0");
  const blueHex = parseInt(blue).toString(16).padStart(2, "0");

  let hexColor = `#${redHex}${greenHex}${blueHex}`;

  if (hexColor === "#000000") {
    hexColor = "#000";
  }
  if (hexColor === "#ffffff") {
    hexColor = "#fff";
  }

  let twColor: string | undefined;
  let twShade: string | undefined;

  for (const [colorType, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      if (value === hexColor) {
        twColor = colorType;
        break;
      }
    } else if (typeof value === "object") {
      for (const [shade, color] of Object.entries(value)) {
        if (color === hexColor) {
          twColor = colorType;
          twShade = shade;
          break;
        }
      }
      if (twColor) {
        break;
      }
    }
  }


  if (!twColor) {
    return `${hexColor}`;
  }

  return `${twColor}${twShade ? `-${twShade}` : ""}`;
};
