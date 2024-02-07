export const cssPadding = "padding";
export const cssMargin = "margin";
export const cssSpacing = `${cssPadding}|${cssMargin}`;

export const cssSpacingDirection = "top|right|bottom|left";

export type CssSpacing = "padding" | "margin";
export type CssPadding = Extract<CssSpacing, "padding">;
export type CssMargin = Extract<CssSpacing, "margin">;

export type CssSpacingDirection = "top" | "right" | "bottom" | "left";
