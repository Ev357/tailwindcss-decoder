export const applySpacing = (prefix: string, value: number) => {
	if (value < 0) {
		return `-${prefix}-${Math.abs(value)}`;
	}

	return `${prefix}-${value}`;
};
