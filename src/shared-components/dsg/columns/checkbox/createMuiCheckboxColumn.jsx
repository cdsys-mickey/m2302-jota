import MuiCheckboxColumn from "./MuiCheckboxColumn";

export const createMuiCheckboxColumn = ({
	trueValue = true,
	falseValue = false,
	ComponentProps,
} = {}) => {
	// console.log("createMuiCheckboxColumn");

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
		// component: MuiCheckboxColumn,
		deleteValue: () => false,
		copyValue: ({ rowData }) => (rowData ? trueValue : falseValue),
		pasteValue: ({ value }) => value === trueValue,
		isCellEmpty: ({ rowData }) => !rowData,
	};
};
