import WebApiOptionPickerColumn from "./WebApiOptionPickerColumn";

export const createWebApiOptionPickerColumn = ({
	// url,
	// parameters,
	// bearer,
	ComponentProps,
} = {}) => {
	return {
		component: (props) => {
			return (
				<WebApiOptionPickerColumn
					// url={url}
					// parameters={parameters}
					// bearer={bearer}
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
