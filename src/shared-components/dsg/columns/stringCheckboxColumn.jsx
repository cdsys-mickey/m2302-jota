import MuiCheckboxColumn from "./MuiCheckboxColumn";

export const stringCheckboxColumn = ({
	trueValue = "1",
	falseValue = "0",
} = {}) => {
	return {
		component: MuiCheckboxColumn,
		deleteValue: () => false,
		copyValue: ({ rowData }) => (rowData ? trueValue : falseValue),
		pasteValue: ({ value }) => value === trueValue,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
