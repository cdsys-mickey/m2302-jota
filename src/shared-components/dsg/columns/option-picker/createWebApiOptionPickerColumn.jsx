import WebApiOptionPickerColumn from "./ZZWebApiOptionPickerColumn";

export const createWebApiOptionPickerColumn = (componentProps) => {
	return {
		component: (props) => {
			return (
				<WebApiOptionPickerColumn
					componentProps={componentProps}
					{...props}
				/>
			);
		},
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => ({}),
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
