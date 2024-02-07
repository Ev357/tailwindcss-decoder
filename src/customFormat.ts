import { cssUnits, type CssUnit } from "./data/cssUnits";
import { getTwSpacing } from "./functions/getTwSpacing";
import { getTwBorder } from "./functions/getTwBorder";
import type { TwRule } from "./loadCss";
import { getTwColorOpacity } from "./functions/getTwColorOpacity";

type FormatFunction = (twRule: TwRule) => string | undefined;

export const customFormat = (twRule: TwRule) => {
  const formatFunctions: FormatFunction[] = [
    (twRule) => {
      // aspect-h-[0-9]*
      // TODO JIT support
      const regexResult = new RegExp(
        "^\\.[a-z]* { --tw-aspect-h: ([0-9]*); }$",
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const value = regexResult[1];

        return `aspect-h-${value}`;
      }

      return undefined;
    },
    (twRule) => {
      // aspect-w-[0-9]*
      // TODO JIT support
      const regexResult = new RegExp(
        "^\\.[a-z]* { position: relative; padding-bottom: calc\\(var\\(--tw-aspect-h\\) \\/ var\\(--tw-aspect-w\\) \\* 100%\\); --tw-aspect-w: ([0-9]*); }$",
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const value = regexResult[1];

        return `aspect-w-${value}`;
      }

      return undefined;
    },
    (twRule) => {
      // prose-indigo
      // TODO Colors
      const regexResult = new RegExp(
        "^\\.[a-z]* { --tw-prose-links: #4f46e5; --tw-prose-invert-links: #6366f1; }$",
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        const value = regexResult[0];

        return "prose-indigo";
      }

      return undefined;
    },
    (twRule) => {
      // -?inset-[0-9]*CssUnit
      const regexResult = new RegExp(
        `^\\.[a-z]* { inset: (-?[0-9.]*)(${cssUnits}); }$`,
        "g"
      ).exec(twRule.cssText);

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
    (twRule) => {
      // border-TwColor
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-border-opacity: 1; border-color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ var\\(--tw-border-opacity\\)\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 4) {
          return undefined;
        }
        const red = regexResult[1];
        const green = regexResult[2];
        const blue = regexResult[3];

        return getTwBorder(red, green, blue);
      }

      return undefined;
    },
    (twRule) => {
      // border-TwColor/[0-9.]
      const regexResult = new RegExp(
        `^\\.[a-z]* { border-color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ ([0-9.]*)\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 5) {
          return undefined;
        }
        const red = regexResult[1];
        const green = regexResult[2];
        const blue = regexResult[3];
        const opacity = regexResult[4];

        const borderClass = getTwBorder(red, green, blue);
        const borderOpacity = getTwColorOpacity(opacity)

        return `${borderClass}${borderOpacity}`;
      }

      return undefined;
    },
  ];

  let resultClass: string | undefined;

  for (let formatFunction of formatFunctions) {
    const result = formatFunction(twRule);

    if (result) {
      resultClass = result;
      break;
    }
  }

  return resultClass;
};
