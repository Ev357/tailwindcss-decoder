import { fullConfig } from "../tailwindConfig";
import { getTwSpacing } from "./getTwSpacing";

export const getTwRingOffsetWidth = (value: string) => {
  const ringOffsetWidth = fullConfig.theme?.ringOffsetWidth;
  if (!ringOffsetWidth) {
    throw Error("ring offset width not set!");
  }

  const twRingWidth = getTwSpacing(value, ringOffsetWidth);

  if (twRingWidth.isNegative) {
    return undefined;
  }

  return `ring-offset-${twRingWidth.classUnit}`;
};
