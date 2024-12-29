import resolveConfig from "tailwindcss/resolveConfig";
import type { Config } from "tailwindcss";

export const tailwindConfig = {
	content: ["auto"],
} satisfies Config;

export const fullConfig = resolveConfig(tailwindConfig);
