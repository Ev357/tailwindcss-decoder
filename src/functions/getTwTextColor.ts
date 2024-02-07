import { fullConfig } from "../tailwindConfig";
import { getTwColor } from "./getTwColor";

export const getTwTextColor = (red: string, green: string, blue: string) => {
  const colors = fullConfig.theme?.textColor;
  if (!colors) {
    throw Error("text colors not set!");
  }

  const twColor = getTwColor(red, green, blue, colors);

  return `text-${twColor}`;
};
