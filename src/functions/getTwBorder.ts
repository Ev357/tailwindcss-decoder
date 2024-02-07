import { fullConfig } from "../tailwindConfig";
import { getTwColor } from "./getTwColor";

export const getTwBorder = (red: string, green: string, blue: string) => {
  const colors = fullConfig.theme?.borderColor;
  if (!colors) {
    throw Error("border colors not set!");
  }

  const twColor = getTwColor(red, green, blue, colors);

  return `border-${twColor}`;
};
