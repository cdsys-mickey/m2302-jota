import SupplierIdPickerComponent from "./SupplierIdPickerComponent";

export const supplierIdPickerColumn = (opts) => {
	return {
		component: SupplierIdPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => JSON.stringify(rowData),
		pasteValue: ({ value }) => JSON.parse(value),
		isCellEmpty: ({ rowData }) => false,
	};
};
