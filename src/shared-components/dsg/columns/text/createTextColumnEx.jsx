import { TextComponentExContainer } from "./TextComponentExContainer";

export const createTextColumnEx = ({
	placeholder,
	alignRight = false,
	continuousUpdates = false,
	deletedValue = "",
	parseUserInput = (value) => value.trim() || null,
	formatBlurredInput = (value) => String(value ?? ""),
	formatInputOnFocus = (value) => String(value ?? ""),
	formatForCopy = (value) => String(value ?? ""),
	parsePastedValue = (value) => value.replace(/[\n\r]+/g, " ").trim() || null,
	...rest
} = {}) => {
	return {
		component: TextComponentExContainer,
		columnData: {
			placeholder,
			alignRight,
			continuousUpdates,
			formatInputOnFocus,
			formatBlurredInput,
			parseUserInput,
			...rest,
		},
		deleteValue: () => deletedValue,
		copyValue: ({ rowData }) => formatForCopy(rowData),
		pasteValue: ({ value }) => parsePastedValue(value),
		isCellEmpty: ({ rowData }) => rowData === null || rowData === undefined,
	};
};
