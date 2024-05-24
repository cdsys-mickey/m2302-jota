import TextComponentEx from "./TextComponentEx";

export const createTextColumnEx = ({
	placeholder,
	alignRight = false,
	continuousUpdates = true,
	deletedValue = null,
	opts,
	parseUserInput = (value) => value.trim() || null,
	formatBlurredInput = (value) => String(value ?? ""),
	formatInputOnFocus = (value) => String(value ?? ""),
	formatForCopy = (value) => String(value ?? ""),
	parsePastedValue = (value) => value.replace(/[\n\r]+/g, " ").trim() || null,
}) => {
	return {
		component: TextComponentEx,
		columnData: {
			placeholder,
			alignRight,
			continuousUpdates,
			formatInputOnFocus,
			formatBlurredInput,
			parseUserInput,
			opts,
		},
		deleteValue: () => deletedValue,
		copyValue: ({ rowData }) => formatForCopy(rowData),
		pasteValue: ({ value }) => parsePastedValue(value),
		isCellEmpty: ({ rowData }) => rowData === null || rowData === undefined,
	};
};
