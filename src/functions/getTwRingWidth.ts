import { fullConfig } from "../tailwindConfig";
import { getTwSpacing } from "./getTwSpacing";

export const getTwRingWidth = (value: string) => {
  const ringWidth = fullConfig.theme?.ringWidth;
  if (!ringWidth) {
    throw Error("ring width not set!");
  }

  const twRingWidth = getTwSpacing(value, ringWidth);
  if (twRingWidth.classUnit === "DEFAULT") {
    return `${twRingWidth.isNegative ? "-" : ""}ring`
  }

  return `${twRingWidth.isNegative ? "-" : ""}ring-${twRingWidth.classUnit}`;
};
