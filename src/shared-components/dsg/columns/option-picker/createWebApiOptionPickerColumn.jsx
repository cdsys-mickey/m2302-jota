import WebApiOptionPickerColumn from "./WebApiOptionPickerColumn";

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
		deleteValue: () => null,
		copyValue: ({ rowData }) => rowData,
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
