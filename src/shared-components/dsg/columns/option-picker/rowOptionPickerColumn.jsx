export const rowOptionPickerColumn = (CellComponent, opts = {}) => {
	return {
		component: CellComponent,
		columnData: opts,
		disableKeys: false,
		keepFocus: true,
		deleteValue: ({ rowData }) => {
			return {
				...rowData,
				[opts.name]: null
			}
		},
		copyValue: ({ rowData }) => JSON.stringify(rowData[opts.name]),
		// pasteValue: ({ value }) => JSON.parse(value),
		isCellEmpty: ({ rowData }) => false,
	};
};
