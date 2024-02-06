export const aspectRatio = {
  auto: "auto",
  square: "1 / 1",
  video: "16 / 9",
} as const satisfies Record<string, string>;
