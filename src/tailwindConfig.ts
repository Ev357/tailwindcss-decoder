import { resolveConfig } from "css-to-tailwindcss/lib/utils/resolveConfig";
import type { TailwindConverterConfig } from "css-to-tailwindcss";

type Config = Exclude<TailwindConverterConfig["tailwindConfig"], undefined>;

export const tailwindConfig = {
  content: ["auto"],
} satisfies Config;

export const fullConfig = resolveConfig(tailwindConfig);
