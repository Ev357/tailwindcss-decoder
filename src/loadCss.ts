import { CssToTailwindTranslator } from "css-to-tailwind-translator";
import { customFormat } from "./customFormat";

const storeClasses = async (classes: Record<string, string>) =>
  await chrome.storage.local.set(classes);

const blackListClasses: string[] = [
  "::before, ::after",
  "abbr:where([title])",
  "*, ::before, ::after",
  "::backdrop",
  "html",
  '.p :where(ul > li):not(:where([class~="not-prose"] *))::marker',
  '.p :where(a code):not(:where([class~="not-prose"] *))',
];

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

  const testSet = new Set<string>();

  for (let i = 0; i < cssRules.length; i += chunkSize) {
    const chunk = cssRules.slice(i, Math.min(i + chunkSize, cssRules.length));

    const chunkClasses = chunk.reduce<Record<string, string>>(
      (chunkClasses, cssRule) => {
        if (cssRule.cssText.includes("@font-face")) {
          return chunkClasses;
        }

        const { code, data } = CssToTailwindTranslator(cssRule.cssText);

        // TODO Remove
        if (cssRule.cssText.includes(".ed {")) {
          console.log(cssRule.cssText);
        }

        const customClass = customFormat(cssRule);
        if (customClass) {
          chunkClasses[cssRule.selectorText] = customClass;
          return chunkClasses;
        }

        if (code === "SyntaxError") {
          return chunkClasses;
        }

        data.forEach((resultCode) => {
          if (!resultCode.resultVal) {
            if (!blackListClasses.includes(resultCode.selectorName)) {
              testSet.add(resultCode.selectorName);
            }

            return;
          }

          chunkClasses[resultCode.selectorName] = resultCode.resultVal;
        });

        return chunkClasses;
      },
      {}
    );

    await storeClasses(chunkClasses);
  }

  console.log(Array.from(testSet));
};
