import ReactSelectComponent from "./ReactSelectComponent";

export const reactSelectColumn = (opts) => ({
	component: ReactSelectComponent,
	columnData: opts,
	disableKeys: true,
	keepFocus: true,
	disabled: opts.disabled,
	deleteValue: () => null,
	copyValue: ({ rowData }) =>
		opts.options.find((choice) => choice.value === rowData)?.label ?? null,
	pasteValue: ({ value }) =>
		opts.options.find((choice) => choice.label === value)?.value ?? null,
});
