import { fullConfig } from "../tailwindConfig";
import { getTwSpacing } from "./getTwSpacing";

export const getTwGapX = (value: string) => {
  const gap = fullConfig.theme?.gap
  if (!gap) {
    throw Error("gap not set!");
  }

  const twGap = getTwSpacing(value, gap);

  return `${twGap.isNegative ? "-" : ""}gap-x-${twGap.classUnit}`;
};
