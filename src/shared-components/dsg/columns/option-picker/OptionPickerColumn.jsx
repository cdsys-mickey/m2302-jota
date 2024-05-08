import OptionPickerComponent from "./OptionPickerComponent";

export const optionPickerColumn = (opts) => {
	return {
		component: OptionPickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: () => false,
	};
};
