import { createTextColumn } from "react-datasheet-grid";

export const fixedOneFloatColumn = createTextColumn({
	alignRight: true,
	continuousUpdates: false,
	formatBlurredInput: (value) =>
		typeof value === "number" ? value.toFixed(1) : "0.0",
	parseUserInput: (value) => {
		const number = parseFloat(value);
		return !isNaN(number) ? number : null;
	},
	parsePastedValue: (value) => {
		const number = parseFloat(value);
		return !isNaN(number) ? number : null;
	},
});
