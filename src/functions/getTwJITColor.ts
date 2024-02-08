import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from "tailwindcss/types/config";
import { fullConfig } from "../tailwindConfig";

export const getTwJITColor = (
  value: string,
  source: ResolvableTo<RecursiveKeyValuePair<string, string>>
) => {
  if (!source) {
    throw Error(`source for ${value} not set!`);
  }

  const twJITColor = Object.entries(source).find(
    (source) => source[1] === value
  )?.[0];
  if (twJITColor) {
    return twJITColor;
  }

  return `${twJITColor}`;
};
