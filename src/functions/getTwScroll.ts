import type { CssSpacing, CssSpacingDirection } from "../data/regex/cssSpacing";
import type { CssUnit } from "../data/regex/cssUnits";
import { getTwSpacing } from "./getTwSpacing";

const getDirectionAlias = (
  direction: CssSpacingDirection,
  isDouble: boolean
) => {
  if (!isDouble) {
    switch (direction) {
      case "top":
        return "t";
      case "right":
        return "r";
      case "bottom":
        return "b";
      case "left":
        return "l";
    }
  }

  return direction === "top" || direction === "bottom" ? "y" : "x";
};

export const getTwScroll = (
  spacing: CssSpacing,
  direction: CssSpacingDirection,
  value: string,
  unit: CssUnit,
  isDouble = false
) => {
  const spacingAlias = spacing === "padding" ? "p" : "m";
  const directionAlias = getDirectionAlias(direction, isDouble);

  const { isNegative, classUnit } = getTwSpacing(value, unit);

  return `${
    isNegative ? "-" : ""
  }scroll-${spacingAlias}${directionAlias}-${classUnit}`;
};
