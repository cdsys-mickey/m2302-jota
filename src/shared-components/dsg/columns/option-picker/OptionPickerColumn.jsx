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
		copyValue: ({ rowData }) => JSON.stringify(rowData),
		pasteValue: ({ value }) => JSON.parse(value),
		isCellEmpty: ({ rowData }) => false,
	};
};
