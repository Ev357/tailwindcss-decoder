import { cursor } from "../data/tailwindConfig/cursor";
import type { CssCursor } from "../data/regex/cssCursors";

export const getTwCursor = (value: CssCursor) => {
  const twCursor = Object.entries(cursor).find(
    (cursor) => cursor[1] === value
  )?.[0];
  if (twCursor) {
    return twCursor;
  }

  return `[${value}]`;
};
