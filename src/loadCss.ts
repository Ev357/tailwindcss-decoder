import { TailwindConverter } from "css-to-tailwindcss";
import { customFormat } from "./customFormat";
import { tailwindConfig } from "./tailwindConfig";
import { parse, type Rule } from "postcss";

export interface TwRule {
  rule: Rule;
  cssText: string;
}

const storeClasses = async (classes: Record<string, string>) =>
  await chrome.storage.local.set(classes);

const blackListClasses: string[] = ["> *", ":where", ":not"];

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

  const twRules = parsedCss.nodes.reduce<TwRule[]>((cssRules, node) => {
    if (node.type === "rule") {
      const cssText = node
        .toString()
        .replaceAll("\n", " ")
        .replaceAll(new RegExp(" {2,}", "g"), " ");

      if (!new RegExp("^\\.[a-z]* {.+").test(cssText)) {
        return cssRules;
      }

      // TODO Remove
      if (node.selector.startsWith(".avq")) {
        console.log(cssText);
      }

      cssRules.push({ rule: node, cssText });
    }

    return cssRules;
  }, []);

  const chucksCount = 20;
  const chunkSize = Math.floor(twRules.length / chucksCount);

  const converter = new TailwindConverter({
    remInPx: null,
    arbitraryPropertiesIsEnabled: true,
    tailwindConfig,
  });

  for (let i = 0; i < twRules.length; i += chunkSize) {
    const chunk = twRules.slice(i, Math.min(i + chunkSize, twRules.length));

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

        // if (nodes[0].tailwindClasses.join(" ").includes("leading")) {
        //   console.log(nodes[0].tailwindClasses, twRule);
        // }

        chunkClasses[twRule.rule.selector] = nodes[0].tailwindClasses.join(" ");
      })
    );

    await storeClasses(chunkClasses);
  }
};
