import { fullConfig } from "../tailwindConfig";
import { getTwColor } from "./getTwColor";

export const getTwBoxShadowColor = (red: string, green: string, blue: string) => {
  const colors = fullConfig.theme?.boxShadowColor;
  if (!colors) {
    throw Error("box shadow colors not set!");
  }

  const twColor = getTwColor(red, green, blue, colors);

  return `shadow-${twColor}`;
};
