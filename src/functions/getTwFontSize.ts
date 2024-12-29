import { fullConfig } from "../tailwindConfig";

export const getTwFontSize = (value: string, lineHeight?: string) => {
	const fontSize = fullConfig.theme?.fontSize;
	if (!fontSize) {
		throw Error("font size not set!");
	}

	let twFontSize: string | undefined;
	if (lineHeight !== undefined) {
		for (const [
			fontSizeTwValue,
			[fontSizeValue, { lineHeight: fontSizeLineHeight }],
		] of Object.entries(fontSize)) {
			if (fontSizeValue === value && fontSizeLineHeight === lineHeight) {
				twFontSize = fontSizeTwValue;
				break;
			}
		}
	}

	if (twFontSize) {
		return `text-${twFontSize}`;
	}

	return `text-[${value}]`;
};
