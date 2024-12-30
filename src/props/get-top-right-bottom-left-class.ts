import type { Declaration } from "postcss";
import { getSpacing } from "../utils/get-spacing";
import { applySpacing } from "../utils/apply-spacing";
import { getJITValue } from "../utils/get-jit-value";

export const getTopRightBottomLeftClass = (
	prefix: string,
	decl: Declaration,
) => {
	switch (decl.value) {
		case "auto":
			return `${prefix}-auto`;
		case "1px":
			return `${prefix}-px`;
		case "-1px":
			return `-${prefix}-px`;
		case "100%":
			return `${prefix}-full`;
		case "-100%":
			return `-${prefix}-full`;
		default: {
			const spacing = getSpacing(decl);

			if (spacing !== undefined) {
				return applySpacing(prefix, spacing);
			}

			return getJITValue(decl);
		}
	}
};
