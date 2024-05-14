import MuiCheckboxComponent from "./MuiCheckboxComponent";

const DEFAULT_OPTS = {
	trueValue: true,
	falseValue: false,
};

export const createMuiCheckboxColumn = (opts = DEFAULT_OPTS) => {
	const { trueValue, falseValue } = opts;

	return {
		component: MuiCheckboxComponent,
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
