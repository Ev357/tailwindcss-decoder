import type { Declaration } from "postcss";
import { twEscape } from "./twEscape";

export const getJITValue = (decl: Declaration) => {
	return `[${twEscape(decl.prop)}:${twEscape(decl.value)}]`;
};
