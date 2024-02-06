import { TailwindConverter } from "css-to-tailwindcss";
import { customFormat } from "./customFormat";
import { tailwindConfig } from "./tailwindConfig";

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

  const compiledStyleSheet = sheets.find((sheet) =>
    sheet?.href?.includes("compiled.css")
  );

  if (!compiledStyleSheet) {
    return;
  }

  const cssRules = Array.from(compiledStyleSheet.cssRules) as CSSStyleRule[];

  const chucksCount = 20;
  const chunkSize = Math.floor(cssRules.length / chucksCount);

  const converter = new TailwindConverter({
    remInPx: null,
    arbitraryPropertiesIsEnabled: true,
    postCSSPlugins: undefined,
    tailwindConfig,
  });

  for (let i = 0; i < cssRules.length; i += chunkSize) {
    const chunk = cssRules.slice(i, Math.min(i + chunkSize, cssRules.length));

    const chunkClasses: Record<string, string> = {};

    await Promise.allSettled(
      chunk.map<void>(async (cssRule) => {
        if (!new RegExp("^\\.[a-z]* {.+").test(cssRule.cssText)) {
          return;
        }

        const customClass = customFormat(cssRule);
        if (customClass) {
          chunkClasses[cssRule.selectorText] = customClass;
          return;
        }

        const { nodes } = await converter.convertCSS(cssRule.cssText);

        if (!nodes.length) {
          return;
        }

        chunkClasses[cssRule.selectorText] = nodes[0].tailwindClasses.join(" ");
      })
    );

    await storeClasses(chunkClasses);
  }
};
