import type { Declaration } from "postcss";
import { getJITValue } from "./utils/get-jit-value";
import { getTopRightBottomLeftClass } from "./props/get-top-right-bottom-left-class";

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
};
