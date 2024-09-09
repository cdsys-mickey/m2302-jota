import ZZSupplierIdPickerComponent from "./ZZSupplierIdPickerComponent";

export const supplierIdPickerColumn = (opts) => {
	return {
		component: ZZSupplierIdPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => JSON.stringify(rowData),
		pasteValue: ({ value }) => JSON.parse(value),
		isCellEmpty: ({ rowData }) => false,
	};
};
