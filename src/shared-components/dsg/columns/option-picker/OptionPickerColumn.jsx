export const optionPickerColumn = (CellComponent, opts = {}) => {
	return {
		component: CellComponent,
		columnData: opts,
		disableKeys: false,
		keepFocus: true,
		deleteValue: ({ rowData }) => {
			return opts.fullRowData ? {
				...rowData,
				[opts.fullRowData]: null
			} : null
		},
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => false,
	};
};
