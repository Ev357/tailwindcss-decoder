export const twPaddingDirection = "p|px|py|pt|pr|pb|pl";
export const twMarginDirection = "m|mx|my|mt|mr|mb|ml";
export const twSpacingDirection = `${twPaddingDirection}|${twMarginDirection}`;

export const twPaddingDoubleDirection = "px|py";
export const twMarginDoubleDirection = "mx|my";

export type TwPaddingDirection = "p" | "px" | "py" | "pt" | "pr" | "pb" | "pl";
export type TwMarginDirection = "m" | "mx" | "my" | "mt" | "mr" | "mb" | "ml";
export type TwSpacingDirection = TwPaddingDirection | TwMarginDirection;

export type TwPaddingDoubleDirection = Extract<TwPaddingDirection, "px" | "py">;
export type TwMarginDoubleDirection = Extract<TwMarginDirection, "mx" | "my">;