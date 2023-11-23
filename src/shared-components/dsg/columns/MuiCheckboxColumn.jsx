import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useCallback, useMemo } from "react";

const MuiCheckboxColumn = memo((props) => {
	const { focus, rowData, setRowData, active, stopEditing, disabled } = props;

	const handleChange = useCallback(
		(e) => {
			if (e.target.checked) {
				setRowData("1");
			} else {
				setRowData("0");
			}
		},
		[setRowData]
	);

	return (
		<Checkbox
			checked={rowData === "1"}
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
