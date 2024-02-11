import { TailwindConverter } from "css-to-tailwindcss";
import { customFormat } from "./customFormat";
import { tailwindConfig } from "./tailwindConfig";
import { parse, type Rule } from "postcss";
import { getTwBreakpoint } from "./functions/getTwBreakpoint";
import { setupWarning } from "./helpers/setupWarning";

export interface TwRule {
  rule: Rule;
  cssText: string;
}

export interface TwAtRule extends TwRule {
  breakpoint: string;
}

const storeClasses = async (classes: Record<string, string>) =>
  await chrome.storage.local.set(classes);

export const loadCss = async (section: Element) => {
  const iframe = section.querySelector("iframe");

  if (!iframe) {
    return;
  }

  const contentWindow = iframe.contentWindow;
  if (!contentWindow) {
    return;
  }

  const sheets = Array.from(contentWindow.document.styleSheets);

  const compiledStyleSheetHref = sheets.find((sheet) =>
    sheet?.href?.includes("compiled.css")
  )?.href;

  if (!compiledStyleSheetHref) {
    return;
  }

  const response = await fetch(compiledStyleSheetHref);
  const css = await response.text();
  const parsedCss = parse(css);

  const twRules = parsedCss.nodes.reduce<[TwRule[], TwAtRule[]]>(
    (twRules, node) => {
      if (node.type === "rule") {
        const cssText = node
          .toString()
          .replaceAll("\n", " ")
          .replaceAll(new RegExp(" {2,}", "g"), " ");

        if (!new RegExp("^\\.[a-z]* {.+").test(cssText)) {
          return twRules;
        }

        twRules[0].push({ rule: node, cssText });
      }

      if (node.type === "atrule") {
        if (node.name !== "media") {
          return twRules;
        }

        const breakpoint = getTwBreakpoint(node.params);
        if (!breakpoint || !node.nodes) {
          return twRules;
        }

        for (let childNode of node.nodes) {
          if (childNode.type === "rule") {
            const cssText = childNode
              .toString()
              .replaceAll("\n", " ")
              .replaceAll(new RegExp(" {2,}", "g"), " ");

            if (!new RegExp("^\\.[a-z]* {.+").test(cssText)) {
              return twRules;
            }

            twRules[1].push({ rule: childNode, cssText, breakpoint });
          }
        }
      }

      return twRules;
    },
    [[], []]
  );

  setupWarning();
  const converter = new TailwindConverter({
    remInPx: null,
    arbitraryPropertiesIsEnabled: true,
    tailwindConfig,
  });

  let chucksCount = 20;
  let chunkSize = Math.floor(twRules[0].length / chucksCount);
  for (let i = 0; i < twRules[0].length; i += chunkSize) {
    const chunk = twRules[0].slice(
      i,
      Math.min(i + chunkSize, twRules[0].length)
    );

    const chunkClasses: Record<string, string> = {};

    await Promise.allSettled(
      chunk.map<void>(async (twRule) => {
        const customClass = customFormat(twRule);
        if (customClass) {
          chunkClasses[twRule.rule.selector] = customClass;
          return;
        }

        const { nodes } = await converter.convertCSS(twRule.cssText);

        if (!nodes.length) {
          return;
        }

        chunkClasses[twRule.rule.selector] = nodes[0].tailwindClasses.join(" ");
      })
    );

    await storeClasses(chunkClasses);
  }

  chucksCount = 20;
  chunkSize = Math.floor(twRules[1].length / chucksCount);
  for (let i = 0; i < twRules[1].length; i += chunkSize) {
    const chunk = twRules[1].slice(
      i,
      Math.min(i + chunkSize, twRules[1].length)
    );

    const chunkClasses: Record<string, string> = {};

    await Promise.allSettled(
      chunk.map<void>(async (twRule) => {
        const customClass = customFormat(twRule);
        if (customClass) {
          chunkClasses[twRule.rule.selector] =
            `${twRule.breakpoint}:${customClass}`;
          return;
        }

        const { nodes } = await converter.convertCSS(twRule.cssText);

        if (!nodes.length) {
          return;
        }

        chunkClasses[twRule.rule.selector] = nodes[0].tailwindClasses
          .map((twClass) => `${twRule.breakpoint}:${twClass}`)
          .join(" ");
      })
    );

    await storeClasses(chunkClasses);
  }
};
