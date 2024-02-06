const getClasses = async (classNames: string[]) => {
  const decodedClasses: Record<string, string> = await chrome.storage.local.get(
    classNames
  );

  return Object.values(decodedClasses).filter(Boolean);
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

  const element = contentWindow.document
    .querySelector("div[id=app]")
    ?.cloneNode(true);
  if (!element) {
    return;
  }

  const allElements = Array.from((<Element>element).getElementsByTagName("*"));

  await allElements.forEach(async (element) => {
    const compiledClassList = element.className
      .split(" ")
      .map((className) => `.${className}`);

    const decompiledClasses = await getClasses(compiledClassList);

    element.className = decompiledClasses.join(" ");
  });

  console.log(element);
};
