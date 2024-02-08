import { fullConfig } from "../tailwindConfig";
import { getTwJITColor } from "./getTwJITColor";

export const getTwJITRingColor = (value: string) => {
  const colors = fullConfig.theme?.ringColor;
  if (!colors) {
    throw Error("ring colors not set!");
  }

  const twJITRingColor = getTwJITColor(value, colors);

  return `ring-${twJITRingColor}`;
};
