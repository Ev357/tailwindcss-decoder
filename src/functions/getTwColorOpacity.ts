import { fullConfig } from "../tailwindConfig";

export const getTwColorOpacity = (value: string) => {
  const opacity = fullConfig.theme?.opacity;
  if (!opacity) {
    throw Error("opacity not set!");
  }

  const twOpacity = Object.entries(opacity).find(
    (opacity) => opacity[1] === value
  )?.[0];
  if (twOpacity) {
    return `/${twOpacity}`;
  }

  return `/[${value}]`;
};
