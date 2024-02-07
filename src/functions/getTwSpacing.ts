import type { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";
import type { CssUnit } from "../data/cssUnits";
import { fullConfig } from "../tailwindConfig";

interface GetTwSpacingResult {
  classUnit: string;
  isNegative: boolean;
}

export const getTwSpacing = (
  value: string,
  unit: CssUnit,
  source?: ResolvableTo<KeyValuePair<string, string>>
) => {
  const isNegative = value.startsWith("-");
  if (isNegative) {
    value = value.slice(1);
  }

  const spacing = source !== undefined ? source : fullConfig.theme?.spacing;
  if (!spacing) {
    throw Error("spacing not set!");
  }

  const twUnit = Object.entries(spacing).find(
    (spacing) => spacing[1] === `${value}${unit}`
  )?.[0];
  if (twUnit) {
    return {
      classUnit: twUnit,
      isNegative,
    } as const satisfies GetTwSpacingResult;
  }

  return {
    classUnit: `[${value}${unit}]`,
    isNegative,
  } as const satisfies GetTwSpacingResult;
};
