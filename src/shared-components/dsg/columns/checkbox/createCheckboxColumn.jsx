import CheckboxComponentContainer from "./CheckboxComponentContainer";

const TRUE_VALUES = ["1", "y", "true", "chekced", "on"];

export const createCheckboxColumn = (opts) => {
	const { toggleBySpace = true, ...rest } = opts;
	return {
		component: CheckboxComponentContainer,
		columnData: rest,
		deleteValue: () => false,
		// We can customize what value is copied: when the checkbox is checked we copy YES, otherwise we copy NO
		copyValue: ({ rowData }) => (rowData ? "1" : "0"),
		// Since we copy custom values, we have to make sure pasting gives us the expected result
		// Here NO is included in the FALSY array, so it will be converted to false, YES is not, so it will be converted to true
		pasteValue: ({ value }) => TRUE_VALUES.includes(value.toLowerCase()),
		isCellEmpty: ({ rowData }) => rowData == null || rowData == undefined,
		toggleBySpace
	};
};
