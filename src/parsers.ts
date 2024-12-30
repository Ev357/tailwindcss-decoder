import type { Declaration } from "postcss";
import { getJITValue } from "./utils/get-jit-value";
import { getTopRightBottomLeftClass } from "./props/get-top-right-bottom-left-class";
import { applyNegative } from "./utils/apply-negative";

export const parsers: Record<
	string,
	(decl: Declaration) => string | undefined
> = {
	"container-type": (decl: Declaration) => {
		return getJITValue(decl);
	},
	"pointer-events": (decl: Declaration) => {
		const prefix = "pointer-events";
		switch (decl.value) {
			case "none":
				return `${prefix}-none`;
			case "auto":
				return `${prefix}-auto`;
		}
	},
	visibility: (decl: Declaration) => {
		switch (decl.value) {
			case "visible":
				return "visible";
			case "invisible":
				return "invisible";
			case "collapse":
				return "collapse";
		}
	},
	position: (decl: Declaration) => {
		switch (decl.value) {
			case "static":
				return "static";
			case "fixed":
				return "fixed";
			case "absolute":
				return "absolute";
			case "relative":
				return "relative";
			case "sticky":
				return "sticky";
		}
	},
	inset: (decl: Declaration) => getTopRightBottomLeftClass("inset", decl),
	"inset-inline": (decl: Declaration) =>
		getTopRightBottomLeftClass("inset-x", decl),
	"inset-block": (decl: Declaration) =>
		getTopRightBottomLeftClass("inset-y", decl),
	top: (decl: Declaration) => getTopRightBottomLeftClass("top", decl),
	right: (decl: Declaration) => getTopRightBottomLeftClass("right", decl),
	left: (decl: Declaration) => getTopRightBottomLeftClass("right", decl),
	bottom: (decl: Declaration) => getTopRightBottomLeftClass("bottom", decl),
	"inset-inline-start": (decl: Declaration) =>
		getTopRightBottomLeftClass("start", decl),
	"inset-inline-end": (decl: Declaration) =>
		getTopRightBottomLeftClass("end", decl),
	isolation: (decl: Declaration) => {
		switch (decl.value) {
			case "isolate":
				return "isolate";
			case "auto":
				return "isolation-auto";
		}
	},
	"z-index": (decl: Declaration) => {
		const prefix = "z";
		switch (decl.value) {
			case "auto":
				return "z-auto";
			default: {
				const value = applyNegative(decl, prefix);

				if (value) {
					return value;
				}

				return getJITValue(decl);
			}
		}
	},
	order: (decl: Declaration) => {
		const prefix = "order";
		switch (decl.value) {
			case "9999":
				return `${prefix}-last`;
			case "-9999":
				return `${prefix}-first`;
			case "0":
				return `${prefix}-none`;
			default: {
				const value = applyNegative(decl, prefix);

				if (value) {
					return value;
				}

				return getJITValue(decl);
			}
		}
	},
	"grid-column": (decl: Declaration) => {
		const prefix = "col";
		switch (decl.value) {
			case "auto":
				return `${prefix}-auto`;
			case "1 / -1":
				return `${prefix}-span-full`;
			default: {
				const regexResult = /^span (.*) \/ span (.*)$/g.exec(decl.value);

				if (regexResult) {
					const fisrtValue = Number.parseFloat(regexResult[1]);
					const secondValue = Number.parseFloat(regexResult[2]);

					if (fisrtValue === secondValue) {
						return `${prefix}-span-${fisrtValue}`;
					}

					return getJITValue(decl);
				}
			}
		}
	},
	"grid-column-start": (decl: Declaration) => {
		const prefix = "col-start";
		switch (decl.value) {
			case "auto":
				return `${prefix}-auto`;
			default: {
				const value = applyNegative(decl, prefix);

				if (value) {
					return value;
				}

				return getJITValue(decl);
			}
		}
	},
	"grid-column-end": (decl: Declaration) => {
		const prefix = "col-end";
		switch (decl.value) {
			case "auto":
				return `${prefix}-auto`;
			default: {
				const value = applyNegative(decl, prefix);

				if (value) {
					return value;
				}

				return getJITValue(decl);
			}
		}
	},
	"grid-row": (decl: Declaration) => {
		const prefix = "row";
		switch (decl.value) {
			case "auto":
				return `${prefix}-auto`;
			case "1 / -1":
				return `${prefix}-span-full`;
			default: {
				const regexResult = /^span (.*) \/ span (.*)$/g.exec(decl.value);

				if (regexResult) {
					const fisrtValue = Number.parseFloat(regexResult[1]);
					const secondValue = Number.parseFloat(regexResult[2]);

					if (fisrtValue === secondValue) {
						return `${prefix}-span-${fisrtValue}`;
					}

					return getJITValue(decl);
				}
			}
		}
	},
	"grid-row-start": (decl: Declaration) => {
		const prefix = "row-start";
		switch (decl.value) {
			case "auto":
				return `${prefix}-auto`;
			default: {
				const value = applyNegative(decl, prefix);

				if (value) {
					return value;
				}

				return getJITValue(decl);
			}
		}
	},
	"grid-row-end": (decl: Declaration) => {
		const prefix = "row-end";
		switch (decl.value) {
			case "auto":
				return `${prefix}-auto`;
			default: {
				const value = applyNegative(decl, prefix);

				if (value) {
					return value;
				}

				return getJITValue(decl);
			}
		}
	},
};
