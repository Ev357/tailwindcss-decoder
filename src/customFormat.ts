import { cssUnits } from "./data/cssUnits";
import { getTwSpacing } from "./functions/getTwSpacing";
import { getTwBorder } from "./functions/getTwBorder";
import type { TwRule } from "./loadCss";
import { getTwColorOpacity } from "./functions/getTwColorOpacity";
import { getTwBackgroundColor } from "./functions/getTwBackgroundColor";
import { getTwTextColor } from "./functions/getTwTextColor";
import { getTwFontSize } from "./functions/getTwFontSize";
import { getTwBoxShadowColor } from "./functions/getTwBoxShadowColor";
import { getTwBoxShadow } from "./functions/getTwBoxShadow";
import { getTwRingWidth } from "./functions/getTwRingWidth";
import { getTwRingColor } from "./functions/getTwRingColor";
import { getTwRingOpacity } from "./functions/getTwRingOpacity";
import { cssSpecialColor, type CssSpecialColor } from "./data/cssSpecialColors";
import { getTwSpecialColor } from "./functions/getTwSpecialColor";
import { fullConfig } from "./tailwindConfig";
import { getTwGapX } from "./functions/getTwGapX";

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
        `^\.[a-z]* { inset: (-?[0-9.]*(${cssUnits})); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 3) {
          return undefined;
        }
        const value = regexResult[1];

        const spacing = getTwSpacing(value);

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
      // border-TwColor/[0-9.]*
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
        const borderOpacity = getTwColorOpacity(opacity);

        return `${borderClass}${borderOpacity}`;
      }

      return undefined;
    },
    (twRule) => {
      // bg-TwColor
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-bg-opacity: 1; background-color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ var\\(--tw-bg-opacity\\)\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 4) {
          return undefined;
        }
        const red = regexResult[1];
        const green = regexResult[2];
        const blue = regexResult[3];

        return getTwBackgroundColor(red, green, blue);
      }

      return undefined;
    },
    (twRule) => {
      // bg-TwColor/[0-9.]*
      const regexResult = new RegExp(
        `^\\.[a-z]* { background-color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ ([0-9.]*)\\); }$`,
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

        const bgClass = getTwBackgroundColor(red, green, blue);
        const borderOpacity = getTwColorOpacity(opacity);

        return `${bgClass}${borderOpacity}`;
      }

      return undefined;
    },
    (twRule) => {
      // text-TwColor
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-text-opacity: 1; color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ var\\(--tw-text-opacity\\)\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 4) {
          return undefined;
        }
        const red = regexResult[1];
        const green = regexResult[2];
        const blue = regexResult[3];

        return getTwTextColor(red, green, blue);
      }

      return undefined;
    },
    (twRule) => {
      // text-TwColor/[0-9.]*
      const regexResult = new RegExp(
        `^\\.[a-z]* { color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ ([0-9.]*)\\); }$`,
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

        const textClass = getTwTextColor(red, green, blue);
        const borderOpacity = getTwColorOpacity(opacity);

        return `${textClass}${borderOpacity}`;
      }

      return undefined;
    },
    (twRule) => {
      // text-TwFontSize
      const regexResult = new RegExp(
        `^\\.[a-z]* { font-size: ([0-9.]*(${cssUnits})); line-height: ([0-9.]*(${cssUnits})?); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 4) {
          return undefined;
        }
        const fontSize = regexResult[1];
        const lineHeight = regexResult[3];

        return getTwFontSize(fontSize, lineHeight);
      }

      return undefined;
    },
    (twRule) => {
      // text-[CssSize]
      const regexResult = new RegExp(
        `^\\.[a-z]* { font-size: ([0-9.]*(${cssUnits})); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 3) {
          return undefined;
        }
        const fontSize = regexResult[1];

        return getTwFontSize(fontSize);
      }

      return undefined;
    },
    (twRule) => {
      // shadow-TwColor/[0-9.]*
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-shadow-color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ ([0-9.]*)\\); --tw-shadow: var\\(--tw-shadow-colored\\); }$`,
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

        const textClass = getTwBoxShadowColor(red, green, blue);
        const borderOpacity = getTwColorOpacity(opacity);

        return `${textClass}${borderOpacity}`;
      }

      return undefined;
    },
    (twRule) => {
      // shadow-TwSpacing (Small)
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-shadow: (([a-z0-9 -.]*) rgb\\([.0-9\\/ -]*\\)); --tw-shadow-colored: ([a-z0-9 -.]*) var\\(--tw-shadow-color\\); box-shadow: var\\(--tw-ring-offset-shadow, 0 0 #0000\\), var\\(--tw-ring-shadow, 0 0 #0000\\), var\\(--tw-shadow\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 4) {
          return undefined;
        }
        const boxShadow = regexResult[1];
        const smallPart = regexResult[2];
        const coloredPart = regexResult[3];

        if (smallPart !== coloredPart) {
          return undefined;
        }

        return getTwBoxShadow(boxShadow);
      }

      return undefined;
    },
    (twRule) => {
      // shadow-TwSpacing (Big)
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-shadow: (([a-z0-9 -.]*) rgb\\([.0-9\\/ -]*\\), ([a-z0-9 -.]*) rgb\\([.0-9\\/ -]*\\)); --tw-shadow-colored: ([a-z0-9 -.]*) var\\(--tw-shadow-color\\), ([a-z0-9 -.]*) var\\(--tw-shadow-color\\); box-shadow: var\\(--tw-ring-offset-shadow, 0 0 #0000\\), var\\(--tw-ring-shadow, 0 0 #0000\\), var\\(--tw-shadow\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 6) {
          return undefined;
        }
        const boxShadow = regexResult[1];
        const smallPart1 = regexResult[2];
        const smallPart2 = regexResult[3];
        const coloredPart1 = regexResult[4];
        const coloredPart2 = regexResult[5];

        if (smallPart1 !== coloredPart1 || smallPart2 !== coloredPart2) {
          return undefined;
        }

        return getTwBoxShadow(boxShadow);
      }

      return undefined;
    },
    (twRule) => {
      // shadow-none
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; box-shadow: var\\(--tw-ring-offset-shadow, 0 0 #0000\\), var\\(--tw-ring-shadow, 0 0 #0000\\), var\\(--tw-shadow\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        return "shadow-none";
      }

      return undefined;
    },
    (twRule) => {
      // ring-TwSpacing
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-ring-offset-shadow: var\\(--tw-ring-inset\\) 0 0 0 var\\(--tw-ring-offset-width\\) var\\(--tw-ring-offset-color\\); --tw-ring-shadow: var\\(--tw-ring-inset\\) 0 0 0 calc\\((-?[0-9.]*(${cssUnits})) \\+ var\\(--tw-ring-offset-width\\)\\) var\\(--tw-ring-color\\); box-shadow: var\\(--tw-ring-offset-shadow\\), var\\(--tw-ring-shadow\\), var\\(--tw-shadow, 0 0 #0000\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 3) {
          return undefined;
        }
        const ringWidth = regexResult[1];

        return getTwRingWidth(ringWidth);
      }

      return undefined;
    },
    (twRule) => {
      // ring-inset
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-ring-inset: inset; }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 1) {
          return undefined;
        }

        return "ring-inset";
      }

      return undefined;
    },
    (twRule) => {
      // ring-TwColor
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-ring-opacity: 1; --tw-ring-color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ var\\(--tw-ring-opacity\\)\\); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 4) {
          return undefined;
        }
        const red = regexResult[1];
        const green = regexResult[2];
        const blue = regexResult[3];

        return getTwRingColor(red, green, blue);
      }

      return undefined;
    },
    (twRule) => {
      // ring-TwColor
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-ring-color: (${cssSpecialColor}); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const specialColor = regexResult[1] as CssSpecialColor;

        const ringColors = fullConfig.theme.ringColor;
        if (!ringColors) {
          throw Error("ring colors not set!");
        }

        const ringColor = getTwSpecialColor(specialColor, ringColors);

        return `ring-${ringColor}`;
      }

      return undefined;
    },
    (twRule) => {
      // ring-TwColor/[0-9.]*
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-ring-color: rgb\\(([0-9]{1,3}) ([0-9]{1,3}) ([0-9]{1,3}) \\/ ([0-9.]*)\\); }$`,
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

        const ringClass = getTwRingColor(red, green, blue);
        const ringOpacity = getTwColorOpacity(opacity);

        return `${ringClass}${ringOpacity}`;
      }

      return undefined;
    },
    (twRule) => {
      // ring-opacity-[0-9]*
      const regexResult = new RegExp(
        "^\\.[a-z]* { --tw-ring-opacity: ([0-9.]*); }$",
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 2) {
          return undefined;
        }
        const ringOpacity = regexResult[1];

        return getTwRingOpacity(ringOpacity);
      }

      return undefined;
    },
    (twRule) => {
      // ring-offset-TwSpacing
      const regexResult = new RegExp(
        `^\\.[a-z]* { --tw-ring-offset-width: (-?[0-9.]*(${cssUnits})); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 3) {
          return undefined;
        }
        const ringOffsetWidth = regexResult[1];

        return getTwRingWidth(ringOffsetWidth);
      }

      return undefined;
    },
    (twRule) => {
      // sr-only
      const regexResult = new RegExp(
        `^\\.[a-z]* { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect\\(0, 0, 0, 0\\); white-space: nowrap; border-width: 0; }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        return "sr-only";
      }

      return undefined;
    },
    (twRule) => {
      // bg-clip-text
      const regexResult = new RegExp(
        `^\\.[a-z]* { -webkit-background-clip: text; background-clip: text; }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        return "bg-clip-text";
      }

      return undefined;
    },
    (twRule) => {
      // -?gap-x-[0-9]*
      const regexResult = new RegExp(
        `^\\.[a-z]* { -moz-column-gap: (-?[0-9.]*(${cssUnits})); column-gap: (-?[0-9.]*(${cssUnits})); }$`,
        "g"
      ).exec(twRule.cssText);

      if (regexResult) {
        if (regexResult.length < 5) {
          return undefined;
        }
        const mozValue = regexResult[1];
        const value = regexResult[3];

        if (mozValue !== value) {
          return undefined;
        }

        return getTwGapX(value);
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
