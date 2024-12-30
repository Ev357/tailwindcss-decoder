import type { Declaration } from "postcss";

export const applyNegative = (decl: Declaration, prefix: string) => {
	const value = Number.parseFloat(decl.value);

	if (!Number.isNaN(value)) {
		return `${prefix}-${value}`;
	}

	const regexResult = /^calc\((.*) \* -1\)$/g.exec(decl.value);

	if (regexResult) {
		const value = Number.parseFloat(regexResult[1]);

		return `-${prefix}-${value}`;
	}
};
