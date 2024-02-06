import { cssUnits } from "./data/cssUnits";
import type { CssUnit } from "./data/cssUnits";
import { getTwSpacing } from "./functions/getTwSpacing";

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
      // inset-[0-9]*CssUnit
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
