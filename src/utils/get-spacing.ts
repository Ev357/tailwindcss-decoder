import type { Declaration } from "postcss";

export const getSpacing = (decl: Declaration) => {
	const regexResult = /^calc\(var\(--spacing\) \* (.*)\)$/g.exec(decl.value);

	if (regexResult) {
		const spacing = Number.parseFloat(regexResult[1]);

		return spacing;
	}
};
