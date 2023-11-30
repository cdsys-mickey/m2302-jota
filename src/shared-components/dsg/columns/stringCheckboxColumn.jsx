import MuiCheckboxColumn from "./MuiCheckboxColumn";

export const stringCheckboxColumn = ({
	trueValue = "1",
	falseValue = "0",
} = {}) => {
	return {
		// component: MuiCheckboxColumn,
		component: (props) => {
			return (
				<MuiCheckboxColumn
					trueValue={trueValue}
					falseValue={falseValue}
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
