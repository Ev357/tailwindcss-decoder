import { createElement } from "./helpers/createElement";

const getClasses = async (classNames: string[]) => {
	const decodedClasses: Record<string, string> =
		await chrome.storage.local.get(classNames);

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

	const compiledElement = contentWindow.document.querySelector("div[id=app]");
	if (!compiledElement) {
		return;
	}

	const element = createElement(compiledElement.innerHTML);
	if (!element) {
		return;
	}

	const allElements = Array.from(element.querySelectorAll("*"));

	await Promise.allSettled(
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
		}),
	);

	return element;
};
