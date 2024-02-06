import type { CssSpacingDirection } from "../data/regex/cssSpacing";

export const getOppositeDirection = (direction: CssSpacingDirection) => {
  if (direction === "top") {
    return "bottom";
  }
  if (direction === "right") {
    return "left";
  }
  if (direction === "bottom") {
    return "top";
  }
  if (direction === "left") {
    return "right";
  }
};
