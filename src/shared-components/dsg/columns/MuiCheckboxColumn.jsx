import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useCallback, useMemo } from "react";

const MuiCheckboxColumn = memo((props) => {
	const {
		trueValue = "1",
		falseValue = "0",
		focus,
		rowData,
		setRowData,
		active,
		stopEditing,
		disabled,
	} = props;

	const handleChange = useCallback(
		(e) => {
			if (e.target.checked) {
				setRowData(trueValue);
			} else {
				setRowData(falseValue);
			}
		},
		[falseValue, setRowData, trueValue]
	);

	return (
		<Checkbox
			checked={rowData === trueValue}
			onChange={handleChange}
			disabled={disabled}
		/>
	);
});

MuiCheckboxColumn.propTypes = {
	focus: PropTypes.bool,
	rowData: PropTypes.any,
	setRowData: PropTypes.func,
	active: PropTypes.bool,
};

MuiCheckboxColumn.displayName = "MuiCheckboxColumn";
export default MuiCheckboxColumn;
