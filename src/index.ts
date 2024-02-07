import { loadCss } from "./loadCss";
import { getDecompiledElement } from "./getDecompiledElement";

(async () => {
  const sections = document.querySelectorAll("section[id^=component-]");

  const paidSections = Array.from(sections).filter((section) => {
    if (section.children[0]?.querySelector("a[href=\\/components\\#pricing]")) {
      return true;
    }
  });

  await [paidSections[1]].forEach(async (section) => {
    await loadCss(section);
    getDecompiledElement(section);
  });
})();
