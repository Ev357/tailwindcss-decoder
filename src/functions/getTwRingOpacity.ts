import { fullConfig } from "../tailwindConfig";

export const getTwRingOpacity = (value: string) => {
  const ringOpacity = fullConfig.theme?.ringOpacity
  if (!ringOpacity) {
    throw Error("ring opacity not set!");
  }

  const twRingOpacity = Object.entries(ringOpacity).find(
    (ringOpacity) => ringOpacity[1] === value
  )?.[0];
  if (twRingOpacity) {
    if (twRingOpacity === "DEFAULT") {
      return undefined
    }
    return `ring-opacity-${twRingOpacity}`;
  }

  return undefined;
};
