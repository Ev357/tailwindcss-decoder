import { panelHtml } from "./html/panel";
import { createElement } from "./helpers/createElement";

const openTabClasses =
  "flex items-center rounded-md bg-white py-[0.4375rem] pl-2 pr-2 text-sm font-semibold shadow lg:pr-3";

const closedTabClasses =
  "flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3";

const getButtonState = (button: HTMLButtonElement) =>
  button.getAttribute("data-headlessui-state") === "selected";

const switchCode = (
  buttonType: "preview" | "code",
  event: MouseEvent,
  otherButton: HTMLButtonElement
) => {
  const target = <HTMLButtonElement | null>event.currentTarget;
  if (!target) {
    return;
  }

  const isSelected = getButtonState(target);
  if (isSelected) {
    return;
  }

  target.setAttribute("data-headlessui-state", "selected");
  target.setAttribute("aria-selected", "true");
  target.setAttribute("class", openTabClasses);

  otherButton.setAttribute("data-headlessui-state", "");
  otherButton.setAttribute("aria-selected", "false");
  otherButton.setAttribute("class", closedTabClasses);
};

export const replaceData = (
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
  if (!previewButton || !codeButton) {
    return;
  }

  previewButton.addEventListener("click", (event) =>
    switchCode("preview", event, codeButton)
  );
  codeButton.addEventListener("click", (event) =>
    switchCode("code", event, previewButton)
  );
};
