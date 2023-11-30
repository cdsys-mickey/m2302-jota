import { createTextColumn } from "react-datasheet-grid";

export const floatColumn = (fixedDigit = 1) =>
	createTextColumn({
		alignRight: true,
		continuousUpdates: false,
		formatBlurredInput: (value) =>
			typeof value === "number" ? value.toFixed(fixedDigit) : "",
		parseUserInput: (value) => {
			const number = parseFloat(value);
			return !isNaN(number) ? number : null;
		},
		parsePastedValue: (value) => {
			const number = parseFloat(value);
			return !isNaN(number) ? number : null;
		},
	});
