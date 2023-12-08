import OptionPickerColumn from "./OptionPickerColumn";

export const createOptionPickerColumn = ({
	options = [],
	ComponentProps,
} = {}) => {
	return {
		component: (props) => {
			return (
				<OptionPickerColumn
					options={options}
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
