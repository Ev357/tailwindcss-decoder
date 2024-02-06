import type { CssUnit } from "../data/regex/cssUnits";
import { fullConfig } from "../tailwindConfig";

interface GetTwSpacingResult {
  classUnit: string;
  isNegative: boolean;
}

export const getTwSpacing = (value: string, unit: CssUnit) => {
  const isNegative = value.startsWith("-");
  if (isNegative) {
    value = value.slice(1);
  }

  const spacing = fullConfig.theme?.spacing;
  if (!spacing) {
    return terminate(value, unit, isNegative);
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

  return terminate(value, unit, isNegative);
};

const terminate = (value: string, unit: CssUnit, isNegative: boolean) =>
  ({
    classUnit: `[${value}${unit}]`,
    isNegative,
  } as const satisfies GetTwSpacingResult);
