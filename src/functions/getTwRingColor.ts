import { fullConfig } from "../tailwindConfig";
import { getTwColor } from "./getTwColor";

export const getTwRingColor = (red: string, green: string, blue: string) => {
	const colors = fullConfig.theme?.ringColor;
	if (!colors) {
		throw Error("ring colors not set!");
	}

	const twColor = getTwColor(red, green, blue, colors);

	return `ring-${twColor}`;
};
