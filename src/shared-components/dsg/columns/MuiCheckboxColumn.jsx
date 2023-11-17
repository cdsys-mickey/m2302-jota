import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useCallback, useMemo } from "react";
import FlexBox from "@/shared-components/FlexBox";

const TRUE_VALUE = "1";
const FALSE_VALUE = "0";

const MuiCheckboxColumn = memo((props) => {
	const { focus, rowData, setRowData, active, stopEditing, disabled } = props;

	const handleChange = useCallback(
		(e) => {
			// console.debug("rowData", rowData);
			// console.debug("newValue", newValue);
			if (e.target.checked) {
				setRowData("1");
			} else {
				setRowData("0");
			}
		},
		[setRowData]
	);

	const checked = useMemo(() => rowData === "1", [rowData]);

	// useLayoutEffect(() => {
	// 	if (focus) {
	// 		setRowData(rowData === TRUE_VALUE ? FALSE_VALUE : TRUE_VALUE);
	// 		stopEditing({ nextRow: false });
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [focus, stopEditing]);

	return (
		<Checkbox
			checked={checked}
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
