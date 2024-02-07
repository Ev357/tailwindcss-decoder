import type { CssSpacingDirection } from "../data/cssSpacing";

export const getOppositeDirection = (direction: CssSpacingDirection) => {
  switch (direction) {
    case "top":
      return "bottom";
    case "right":
      return "left";
    case "bottom":
      return "top";
    case "left":
      return "right";
  }
};
