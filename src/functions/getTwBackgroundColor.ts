import { fullConfig } from "../tailwindConfig";
import { getTwColor } from "./getTwColor";

export const getTwBackgroundColor = (
	red: string,
	green: string,
	blue: string,
) => {
	const colors = fullConfig.theme?.backgroundColor;
	if (!colors) {
		throw Error("background colors not set!");
	}

	const twColor = getTwColor(red, green, blue, colors);

	return `bg-${twColor}`;
};
