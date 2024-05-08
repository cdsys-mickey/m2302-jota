import DeptPickerComponent from "./DeptPickerComponent";

export const deptPickerColumn = (opts) => {
	return {
		component: DeptPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => false,
	};
};
