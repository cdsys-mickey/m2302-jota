import { createTextColumn } from "react-datasheet-grid";

export const createIntColumn = () =>
	createTextColumn({
		alignRight: true,
		continuousUpdates: false,
		formatBlurredInput: (value) => {
			if (value === "" || value === null || value === undefined) {
				return "";
			}
			let number = Number(value);
			if (isNaN(number)) {
				return "";
			}
			return Math.round(number);
		},
		parseUserInput: (value) => {
			const number = Number(value);
			return !isNaN(number) ? Math.round(number) : null;
		},
		parsePastedValue: (value) => {
			const number = Number(value);
			return !isNaN(number) ? Math.round(number) : null;
		},
	});
