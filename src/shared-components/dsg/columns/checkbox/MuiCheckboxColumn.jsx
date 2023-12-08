import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { useLayoutEffect } from "react";
import { memo, useCallback, useMemo } from "react";

const MuiCheckboxColumn = memo((props) => {
	const {
		trueValue = "1",
		falseValue = "0",
		ComponentProps,
		// disableRipple = true,
		sx = [],
		/** BUILT-IN PROPS */
		focus,
		rowData,
		setRowData,
		active,
		stopEditing,
		disabled,
		// ...rest
	} = props;

	const rowDataToChecked = useCallback(
		(rowData) => {
			return rowData === trueValue;
		},
		[trueValue]
	);

	const checkedToRowData = useCallback(
		(checked) => {
			return checked ? trueValue : falseValue;
		},
		[falseValue, trueValue]
	);

	const handleChange = useCallback(
		(e) => {
			// e?.preventDefault();
			const checked = e.target.checked;
			// console.debug(`checked: ${checked}`);
			if (checked) {
				setRowData(trueValue);
			} else {
				setRowData(falseValue);
			}
		},
		[falseValue, setRowData, trueValue]
	);

	// useLayoutEffect(() => {
	// 	// console.debug(`focus: ${focus}`);
	// 	if (focus) {
	// 		setRowData(checkedToRowData(!rowDataToChecked(rowData)));
	// 		stopEditing({ nextRow: false });
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [focus, stopEditing]);

	return (
		<Checkbox
			checked={rowData === trueValue}
			// onMouseDown={handleChange}
			onChange={handleChange}
			disabled={disabled}
			// disableRipple={disableRipple}
			sx={[
				{
					padding: "8px",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...ComponentProps}
		/>
	);
});

MuiCheckboxColumn.propTypes = {
	// disableRipple: PropTypes.bool,
	focus: PropTypes.bool,
	rowData: PropTypes.any,
	setRowData: PropTypes.func,
	active: PropTypes.bool,
	ComponentProps: PropTypes.object,
};

MuiCheckboxColumn.displayName = "MuiCheckboxColumn";
export default MuiCheckboxColumn;
