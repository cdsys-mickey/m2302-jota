export const createOptionPickerColumn = (CellComponent) => {
	return {
		component: CellComponent,
		disableKeys: true,
		keepFocus: false,
		deleteValue: () => ({}),
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
