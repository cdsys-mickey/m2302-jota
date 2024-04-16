import ProdPickerComponent from "../ProdPickerComponent";

export const prodPickerColumn = (opts) => {
	return {
		component: ProdPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: false,
		deleteValue: () => ({}),
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
