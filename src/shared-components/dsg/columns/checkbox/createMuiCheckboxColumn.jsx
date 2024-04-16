import MuiCheckboxColumn from "./MuiCheckboxColumn";

const DEFAULT_OPTS = {
	trueValue: "1",
	falseValue: "0",
};

export const createMuiCheckboxColumn = (opts = DEFAULT_OPTS) => {
	const { trueValue, falseValue } = opts;

	return {
		component: MuiCheckboxColumn,
		columnData: {
			trueValue,
			falseValue,
		},
		deleteValue: () => false,
		copyValue: ({ rowData }) => (rowData ? trueValue : falseValue),
		pasteValue: ({ value }) => value === trueValue,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
