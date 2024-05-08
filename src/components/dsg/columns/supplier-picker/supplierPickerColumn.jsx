import SupplierPickerComponent from "./SupplierPickerComponent";

export const supplierPickerColumn = (opts) => {
	return {
		component: SupplierPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => false,
	};
};
