export const optionPickerColumn = (CellComponent, opts = {}) => {
	return {
		component: CellComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => false,
	};
};
