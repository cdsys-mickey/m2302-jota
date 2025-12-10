import CustomerPickerComponent from "./CustomerPickerComponent";

export const customerPickerColumn = (opts) => {
	return {
		component: CustomerPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => false,
	};
};
