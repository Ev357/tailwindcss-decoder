import { fullConfig } from "../tailwindConfig";

export const getTwBoxShadow = (value: string) => {
	const boxShadow = fullConfig.theme?.boxShadow;
	if (!boxShadow) {
		throw Error("box shadow not set!");
	}

	const twBoxShadow = Object.entries(boxShadow).find(
		(boxShadow) => boxShadow[1] === value,
	)?.[0];
	if (twBoxShadow) {
		if (twBoxShadow === "DEFAULT") {
			return "shadow";
		}
		return `shadow-${twBoxShadow}`;
	}

	return undefined;
};
