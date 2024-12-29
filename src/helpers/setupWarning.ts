export const setupWarning = () => {
	const originalWarn = console.warn;

	console.warn = (...args) => {
		if (
			args[0].toString() ===
			"Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
		) {
			return;
		}

		originalWarn.apply(console, [...args]);
	};
};
