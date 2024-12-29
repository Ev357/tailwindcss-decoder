export const switchCode = (
	buttonType: "preview" | "code",
	event: MouseEvent,
	otherButton: HTMLButtonElement,
	previewDiv: HTMLDivElement,
	codePre: HTMLPreElement,
) => {
	const target = <HTMLButtonElement | null>event.currentTarget;
	if (!target) {
		return;
	}

	const isSelected =
		target.getAttribute("data-headlessui-state") === "selected";
	if (isSelected) {
		return;
	}

	const targetSvg = target.querySelector("svg");
	const otherSvg = otherButton.querySelector("svg");
	if (!targetSvg || !otherSvg) {
		return;
	}

	target.setAttribute("data-headlessui-state", "selected");
	target.setAttribute("aria-selected", "true");
	target.setAttribute("class", openTabClasses);
	targetSvg.classList.remove("stroke-slate-600");
	targetSvg.classList.add("stroke-sky-500");

	otherButton.setAttribute("data-headlessui-state", "");
	otherButton.setAttribute("aria-selected", "false");
	otherButton.setAttribute("class", closedTabClasses);
	otherSvg.classList.remove("stroke-sky-500");
	otherSvg.classList.add("stroke-slate-600");

	if (buttonType === "code") {
		codePre.classList.remove("hidden");
		previewDiv.classList.add("hidden");
	}

	if (buttonType === "preview") {
		previewDiv.classList.remove("hidden");
		codePre.classList.add("hidden");
	}
};

const openTabClasses =
	"flex items-center rounded-md bg-white py-[0.4375rem] pl-2 pr-2 text-sm font-semibold shadow lg:pr-3";

const closedTabClasses =
	"flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3";
