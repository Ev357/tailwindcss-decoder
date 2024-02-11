import { panelHtml } from "./html/panel";
import { createElement } from "./helpers/createElement";
import { format } from "prettier";
import parserHtml from "prettier/parser-html";
import hljs from "highlight.js/lib/core";
import hljsXml from "highlight.js/lib/languages/xml";
import { createCodeElement } from "./helpers/createCodeElement";
import { switchCode } from "./helpers/switchCode";

const copyComponent = (html: string, divButton: HTMLDivElement) => {
  let isSuccess: boolean;
  try {
    navigator.clipboard.writeText(html);
    isSuccess = true;
  } catch (_) {
    isSuccess = false;
  }

  if (!isSuccess) {
    return;
  }

  const copyButtonDiv: HTMLDivElement | null = divButton.querySelector(
    "div[data-type=copy]"
  );
  const copiedButtonDiv: HTMLDivElement | null = divButton.querySelector(
    "div[data-type=copied]"
  );
  if (!copyButtonDiv || !copiedButtonDiv) {
    return;
  }

  copyButtonDiv.setAttribute("class", "hidden");
  copiedButtonDiv.setAttribute("class", "");
  setTimeout(() => {
    copyButtonDiv.setAttribute("class", "");
    copiedButtonDiv.setAttribute("class", "hidden");
  }, 2000);
};

export const replaceData = async (
  section: Element,
  decompiledDiv: HTMLDivElement
) => {
  const panel = section.querySelector("div.flex.items-center.justify-between");
  if (!panel) {
    return;
  }

  const componentAnchor: HTMLAnchorElement | null = panel.querySelector(
    "a[href^='#component-']"
  );
  if (!componentAnchor) {
    return;
  }

  const componentName = componentAnchor.textContent;
  const componentHref = componentAnchor.href;

  if (!componentHref || !componentName) {
    return;
  }

  const myPanel = createElement(panelHtml);

  const myComponentAnchor: HTMLAnchorElement | null =
    myPanel.querySelector("a[href='']");

  if (!myComponentAnchor) {
    return;
  }

  myComponentAnchor.innerText = componentName;
  myComponentAnchor.href = componentHref;

  panel.innerHTML = myPanel.innerHTML;

  const previewButton: HTMLButtonElement | null = panel.querySelector(
    "button[aria-selected=true]"
  );
  const codeButton: HTMLButtonElement | null = panel.querySelector(
    "button[aria-selected=false]"
  );
  const clipboardDiv: HTMLDivElement | null = panel.querySelector(
    "div[data-state=copy]"
  );
  if (!previewButton || !codeButton || !clipboardDiv) {
    return;
  }

  const prettifiedHtml = await format(decompiledDiv.innerHTML, {
    parser: "html",
    plugins: [parserHtml],
    htmlWhitespaceSensitivity: "ignore",
  });

  clipboardDiv.addEventListener("click", () =>
    copyComponent(prettifiedHtml, clipboardDiv)
  );

  hljs.registerLanguage("xml", hljsXml);

  const highlightedCode = hljs.highlight(prettifiedHtml, {
    language: "xml",
  }).value;

  const codeElement = createCodeElement(highlightedCode);

  const codeDiv: HTMLDivElement | null = section.querySelector("div.mt-4");
  if (!codeDiv) {
    return;
  }

  codeDiv.appendChild(codeElement);

  const previewDiv: HTMLDivElement | null = codeDiv.querySelector(
    "div.relative[id^=frame-]"
  );
  if (!previewDiv) {
    return;
  }

  previewButton.addEventListener("click", (event) =>
    switchCode("preview", event, codeButton, previewDiv, codeElement)
  );
  codeButton.addEventListener("click", (event) =>
    switchCode("code", event, previewButton, previewDiv, codeElement)
  );
};
