import { createTextColumn } from "react-datasheet-grid";
import Types from "../../../../shared-modules/sd-types";

export const createFloatColumn = (fixedDigit = 1) =>
	createTextColumn({
		alignRight: true,
		continuousUpdates: false,
		formatBlurredInput: (value) => {
			let number = Number(value);
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
