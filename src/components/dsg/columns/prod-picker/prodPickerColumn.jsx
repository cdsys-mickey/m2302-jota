import ProdPickerComponent from "./ProdPickerComponent";

export const prodPickerColumn = (opts) => {
	return {
		component: ProdPickerComponent,
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