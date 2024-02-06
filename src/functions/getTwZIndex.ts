import { zIndex } from "../data/tailwindConfig/zIndex";

interface GetTwZIndexResult {
  index: string;
  isNegative: boolean;
}

export const getTwZIndex = (value: string) => {
  const isNegative = value.startsWith("-");
  if (isNegative) {
    value = value.slice(1);
  }
  const twIndex = Object.entries(zIndex).find(
    (spacing) => spacing[1] === value
  )?.[0];
  if (twIndex) {
    return {
      index: twIndex,
      isNegative,
    } satisfies GetTwZIndexResult;
  }

  return {
    index: `[${value}]`,
    isNegative,
  } satisfies GetTwZIndexResult;
};
