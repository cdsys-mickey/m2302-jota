import CheckboxComponent from "./CheckboxComponent";

export const checkboxColumn2 = {
	component: CheckboxComponent,
	deleteValue: () => false,
	// We can customize what value is copied: when the checkbox is checked we copy YES, otherwise we copy NO
	copyValue: ({ rowData }) => (rowData ? "1" : "0"),
	// Since we copy custom values, we have to make sure pasting gives us the expected result
	// Here NO is included in the FALSY array, so it will be converted to false, YES is not, so it will be converted to true
	pasteValue: ({ value }) =>
		![
			"",
			"false",
			"no",
			"off",
			"disabled",
			"0",
			"n",
			"f",
			"unchecked",
			"undefined",
			"null",
			"wrong",
			"negative",
		].includes(value.toLowerCase()),
	isCellEmpty: ({ rowData }) => !rowData,
};
