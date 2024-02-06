import { cssUnits, type CssUnit } from "./data/regex/cssUnits";
import { getTwSpacing } from "./functions/getTwSpacing";
import { getTwZIndex } from "./functions/getTwZIndex";
import { cssCursors, type CssCursor } from "./data/regex/cssCursors";
import { getTwCursor } from "./functions/getTwCursor";
import {
  cssSpacing,
  cssSpacingDirection,
  type CssSpacing,
  type CssSpacingDirection,
} from "./data/regex/cssSpacing";
import { getTwDoubleScroll } from "./functions/getTwDoubleScroll";
import { getOppositeDirection } from "./functions/getOppositeDirection";

type FormatFunction = (cssStyle: CSSStyleRule) => string | undefined;

export const customFormat = (cssStyle: CSSStyleRule) => {
  const formatFunctions: FormatFunction[] = [
    (cssRule) => {
      // aspect-h-[0-9]*
      // TODO JIT support
      const regexResult = new RegExp(
        "^\\.[a-z]* { --tw-aspect-h: ([0-9]*); }$",
        "g"
      ).exec(cssRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const value = regexResult[1];

        return `aspect-h-${value}`;
      }

      return undefined;
    },
    (cssRule) => {
      // aspect-w-[0-9]*
      // TODO JIT support
      const regexResult = new RegExp(
        "^\\.[a-z]* { position: relative; padding-bottom: calc\\(var\\(--tw-aspect-h\\) \\/ var\\(--tw-aspect-w\\) \\* 100%\\); --tw-aspect-w: ([0-9]*); }$",
        "g"
      ).exec(cssRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const value = regexResult[1];

        return `aspect-w-${value}`;
      }

      return undefined;
    },
    (cssRule) => {
      // prose-indigo
      // TODO Colors
      const regexResult = new RegExp(
        "^\\.[a-z]* { --tw-prose-links: #4f46e5; --tw-prose-invert-links: #6366f1; }$",
        "g"
      ).exec(cssRule.cssText);

      if (regexResult) {
        const value = regexResult[0];

        return "prose-indigo";
      }

      return undefined;
    },
    (cssRule) => {
      // -?inset-[0-9]*CssUnit
      const regexResult = new RegExp(
        `^\\.[a-z]* { inset: (-?[0-9|.]*)(${cssUnits}); }$`,
        "g"
      ).exec(cssRule.cssText);

      if (regexResult) {
        if (regexResult.length < 3) {
          return undefined;
        }
        const value = regexResult[1];
        const unit = regexResult[2] as CssUnit;

        const spacing = getTwSpacing(value, unit);

        return `${spacing.isNegative ? "-" : ""}inset-${spacing.classUnit}`;
      }

      return undefined;
    },
    (cssRule) => {
      // -?z-[0-9]*
      const regexResult = new RegExp(
        `^\\.[a-z]* { z-index: (-?[0-9]*); }$`,
        "g"
      ).exec(cssRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const value = regexResult[1];

        const zIndex = getTwZIndex(value);

        return `${zIndex.isNegative ? "-" : ""}z-${zIndex.index}`;
      }

      return undefined;
    },
    (cssRule) => {
      // cursor-Cursor
      const regexResult = new RegExp(
        `^\\.[a-z]* { cursor: (${cssCursors}); }$`,
        "g"
      ).exec(cssRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const value = regexResult[1] as CssCursor;

        const cursor = getTwCursor(value);

        return `cursor-${cursor}`;
      }

      return undefined;
    },
    (cssRule) => {
      // -?scroll-(p|m)(x|y)-[0-9]*CssUnit
      const regexResult = new RegExp(
        `^\\.[a-z]* { scroll-(${cssSpacing})-(${cssSpacingDirection}): (-?[0-9|.]*)(${cssUnits}); scroll-(${cssSpacing})-(${cssSpacingDirection}): (-?[0-9|.]*)(${cssUnits}); }$`,
        "g"
      ).exec(cssRule.cssText);

      if (regexResult) {
        if (regexResult.length < 9) {
          return undefined;
        }
        const spacing1 = regexResult[1] as CssSpacing;
        const spacingDirection1 = regexResult[2] as CssSpacingDirection;
        const value1 = regexResult[3];
        const unit1 = regexResult[4] as CssUnit;

        const spacing2 = regexResult[5] as CssSpacing;
        const spacingDirection2 = regexResult[6] as CssSpacingDirection;
        const value2 = regexResult[7];
        const unit2 = regexResult[8] as CssUnit;

        if (spacing1 !== spacing2 || value1 !== value2 || unit1 !== unit2) {
          return undefined;
        }
        if (spacingDirection1 !== getOppositeDirection(spacingDirection2)) {
          return undefined;
        }

        return getTwDoubleScroll(spacing1, spacingDirection1, value1, unit1);
      }

      return undefined;
    },
  ];

  let resultClass: string | undefined;

  for (let formatFunction of formatFunctions) {
    const result = formatFunction(cssStyle);

    if (result) {
      resultClass = result;
      break;
    }
  }

  return resultClass;
};
