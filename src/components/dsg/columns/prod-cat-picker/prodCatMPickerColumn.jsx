import ProdCatMPickerComponent from "./ProdCatMPickerComponent";

export const prodCatMPickerColumn = (opts = {}) => {
	return {
		component: ProdCatMPickerComponent,
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
