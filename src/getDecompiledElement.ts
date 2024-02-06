const getClasses = async (classNames: string[]) => {
  const decodedClasses: Record<string, string> = await chrome.storage.local.get(
    classNames
  );

  return Object.values(decodedClasses).filter(Boolean);
};

const createElement = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;

  return div;
};

export const getDecompiledElement = async (section: Element) => {
  const iframe = section.querySelector("iframe");

  if (!iframe) {
    return;
  }

  const contentWindow = iframe.contentWindow;
  if (!contentWindow) {
    return;
  }

  const compiledElement = contentWindow.document.querySelector("div[id=app]");
  if (!compiledElement) {
    return;
  }

  const element = createElement(compiledElement.innerHTML);
  if (!element) {
    return;
  }

  const allElements = Array.from(element.querySelectorAll("*"));

  await Promise.all(
    allElements.map<void>(async (element) => {
      const classes = element.getAttribute("class");
      if (!classes) {
        return;
      }

      const compiledClassList = classes
        .split(" ")
        .map((className) => `.${className}`);

      const decompiledClasses = await getClasses(compiledClassList);

      element.setAttribute("class", decompiledClasses.join(" "));
    })
  );

  // console.log(element.innerHTML);
  console.log(await getClasses([".ae"]));
};
