import MuiCheckboxColumn from "./MuiCheckboxColumn";

export const createMuiCheckboxColumn = ({
	trueValue = "1",
	falseValue = "0",
	ComponentProps,
} = {}) => {
	return {
		component: (props) => {
			return (
				<MuiCheckboxColumn
					trueValue={trueValue}
					falseValue={falseValue}
					ComponentProps={ComponentProps}
					{...props}
				/>
			);
		},
		deleteValue: () => false,
		copyValue: ({ rowData }) => (rowData ? trueValue : falseValue),
		pasteValue: ({ value }) => value === trueValue,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
