import ProdCatSPickerComponent from "./ProdCatSPickerComponent";

export const prodCatSPickerColumn = (opts = {}) => {
	return {
		component: ProdCatSPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		// copyValue: ({ rowData }) => Prods.getOptionLabel(rowData),
		// pasteValue: ({ value }) => value,
		copyValue: ({ rowData }) => JSON.stringify(rowData),
		pasteValue: ({ value }) => JSON.parse(value),
		isCellEmpty: ({ rowData }) => false,
	};
};
