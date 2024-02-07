import { fullConfig } from "../tailwindConfig";
import { cssUnits } from "../data/cssUnits";

export const getTwBreakpoint = (value: string) => {
  const regexResult = new RegExp(
    `^\\(min-width: ([0-9]*(${cssUnits}))\\)$`
  ).exec(value);
  if (!regexResult) {
    return;
  }
  if (regexResult.length < 3) {
    return;
  }

  const breakpoint = regexResult[1];

  const breakpoints = fullConfig.theme?.screens;
  if (!breakpoints) {
    throw Error("breakpoints not set!");
  }

  const twBreakpoint = Object.entries(breakpoints).find(
    (breakpoints) => breakpoints[1] === breakpoint
  )?.[0];

  return twBreakpoint;
};
