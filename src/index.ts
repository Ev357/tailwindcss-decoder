import { loadCss, type WrongClass } from "./loadCss";
import { getDecompiledElement } from "./getDecompiledElement";
import { replaceData } from "./replaceData";

(async () => {
  const sections = document.querySelectorAll("section[id^=component-]");

  const paidSections = Array.from(sections).filter((section) => {
    if (section.children[0]?.querySelector("a[href=\\/components\\#pricing]")) {
      return true;
    }
  });

  const wrongClasses: WrongClass[] = [];

  await Promise.allSettled(
    paidSections.map(async (section) => {
      const wrongSectionClasses = await loadCss(section);
      const decompiledDiv = await getDecompiledElement(section);
      if (!decompiledDiv) {
        return;
      }
      replaceData(section, decompiledDiv);

      if (!wrongSectionClasses) {
        return;
      }

      wrongClasses.push(...wrongSectionClasses);
    })
  );

  if (wrongClasses.length) {
    const filteredMap = wrongClasses.reduce<Record<string, WrongClass>>(
      (wrongClasses, wrongClass) => {
        wrongClasses[wrongClass.cssText] = wrongClass;
        return wrongClasses;
      },
      {}
    );
    const filteredWrongClasses = Object.values(filteredMap);

    console.warn("Failed to decompile classes:", filteredWrongClasses);
  }
})();
