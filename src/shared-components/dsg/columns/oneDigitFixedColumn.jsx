import { createTextColumn } from "react-datasheet-grid";

export const oneDigitFixedColumn = createTextColumn({
	alignRight: true,
	continuousUpdates: false,
	formatBlurredInput: (value) =>
		typeof value === "number" ? value.toFixed(1) : "",
	parseUserInput: (value) => {
		const number = parseFloat(value);
		return !isNaN(number) ? number : null;
	},
	parsePastedValue: (value) => {
		const number = parseFloat(value);
		return !isNaN(number) ? number : null;
	},
});
