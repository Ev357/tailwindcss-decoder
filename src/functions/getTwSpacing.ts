import type { CssUnit } from "../data/cssUnits";
import { spacing } from "../data/tailwindConfig/spacing";

interface GetTwSpacingResult {
  classUnit: string;
  isNegative: boolean;
}

export const getTwSpacing = (value: string, unit: CssUnit) => {
  const isNegative = value.startsWith("-");
  if (isNegative) {
    value = value.slice(1);
  }
  const twUnit = Object.entries(spacing).find(
    (spacing) => spacing[1] === `${value}${unit}`
  )?.[0];
  if (twUnit) {
    return {
      classUnit: twUnit,
      isNegative,
    } satisfies GetTwSpacingResult;
  }

  return {
    classUnit: `[${value}${unit}]`,
    isNegative,
  } satisfies GetTwSpacingResult;
};
