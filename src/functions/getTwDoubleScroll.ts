import type { CssSpacing, CssSpacingDirection } from "../data/regex/cssSpacing";
import type { CssUnit } from "../data/regex/cssUnits";
import { getTwSpacing } from "./getTwSpacing";

export const getTwDoubleScroll = (
  spacing: CssSpacing,
  direction: CssSpacingDirection,
  value: string,
  unit: CssUnit
) => {
  const spacingAlias = spacing === "padding" ? "p" : "m";
  const directionAlias =
    direction === "top" || direction === "bottom" ? "y" : "x";

  const { isNegative, classUnit } = getTwSpacing(value, unit);

  return `${
    isNegative ? "-" : ""
  }scroll-${spacingAlias}${directionAlias}-${classUnit}`;
};
