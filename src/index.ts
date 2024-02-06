import { CssToTailwindTranslator } from "css-to-tailwind-translator";

const storeClasses = async (classes: Record<string, string>) =>
  await chrome.storage.local.set(classes);

const getClasses = async (classNames: string[]) => {
  const decodedClasses: Record<string, string> = await chrome.storage.local.get(
    classNames
  );

  return Object.values(decodedClasses).filter(Boolean);
};

(async () => {
  const frames = document.getElementsByTagName("iframe");

  const myFrame = frames[1];

  const contentWindow = myFrame.contentWindow;
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

  const cssRules = Array.from(compiledStyleSheet.cssRules);
  const chucksCount = 20;
  const chunkSize = Math.floor(cssRules.length / chucksCount);

  for (let i = 0; i < cssRules.length; i += chunkSize) {
    const chunk = cssRules.slice(i, Math.min(i + chunkSize, cssRules.length));

    const chunkClasses = chunk.reduce<Record<string, string>>(
      (chunkClasses, { cssText }) => {
        if (cssText.includes("@font-face")) {
          return chunkClasses;
        }

        const { code, data } = CssToTailwindTranslator(cssText);

        if (code === "SyntaxError") {
          return chunkClasses;
        }

        data.forEach((resultCode) => {
          if (!resultCode.resultVal) {
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

  const decodedClass = await getClasses([".aoe"]);

  console.log(decodedClass);
})();
