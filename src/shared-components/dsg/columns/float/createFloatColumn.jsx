import { createTextColumn } from "react-datasheet-grid";
// import { createTextColumnEx } from "../text/createTextColumnEx";

export const createFloatColumn = (fixedDigit = 1, opts = {}) =>
	createTextColumn({
		alignRight: true,
		continuousUpdates: false,
		opts,
		formatBlurredInput: (value) => {
			if (value === "" || value === null || value === undefined) {
				return "";
			}
			let number = Number(value);
			// console.log(`${value} parsed as ${number}`);
			if (isNaN(number)) {
				return "";
			}
			return number.toFixed(fixedDigit);
		},
		parseUserInput: (value) => {
			const number = Number(value);
			return !isNaN(number) ? number : null;
		},
		parsePastedValue: (value) => {
			const number = Number(value);
			return !isNaN(number) ? number : null;
		},
	});
