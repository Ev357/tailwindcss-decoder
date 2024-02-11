import { loadCss } from "./loadCss";
import { getDecompiledElement } from "./getDecompiledElement";
import { replaceData } from "./replaceData";

(async () => {
  const sections = document.querySelectorAll("section[id^=component-]");

  const paidSections = Array.from(sections).filter((section) => {
    if (section.children[0]?.querySelector("a[href=\\/components\\#pricing]")) {
      return true;
    }
  });

  await paidSections.forEach(async (section) => {
    await loadCss(section);
    const decompiledDiv = await getDecompiledElement(section);
    if (!decompiledDiv) {
      return;
    }
    replaceData(section, decompiledDiv);
  });
})();
