export const absoluteLengths = "cm|mm|in|px|pt|pc";
export const relativeLengths = "em|ex|ch|rem|vw|vh|vmin|vmax|%";
export const cssUnits = `${absoluteLengths}|${relativeLengths}`;

export type AbsoluteLengths = "cm" | "mm" | "in" | "px" | "pt" | "pc";
export type RelativeLengths =
	| "em"
	| "ex"
	| "ch"
	| "rem"
	| "vw"
	| "vh"
	| "vmin"
	| "vmax"
	| "%";

export type CssUnit = AbsoluteLengths | RelativeLengths;
