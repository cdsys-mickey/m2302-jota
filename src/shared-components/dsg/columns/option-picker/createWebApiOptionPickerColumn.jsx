import WebApiOptionPickerColumn from "./WebApiOptionPickerColumn";

export const createWebApiOptionPickerColumn = (ComponentProps) => {
	return {
		component: (props) => {
			return (
				<WebApiOptionPickerColumn
					ComponentProps={ComponentProps}
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
