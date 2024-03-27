import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { memo, useCallback, useMemo } from "react";

// const arePropsEqual = (oldProps, newProps) => {
// 	const result = oldProps.rowData === newProps.rowData;
// 	// console.log("equal", result);
// 	return result;
// };

const MuiCheckboxColumn = memo((props) => {
	// console.log("rendering MuiCheckboxColumn", props);
	const {
		trueValue = true,
		falseValue = false,
		// ComponentProps,
		// disableRipple = true,
		sx = [],
		/** BUILT-IN PROPS */
		// columnData,
		// focus,
		rowData,
		setRowData,
		// active,
		// stopEditing,
		disabled,
		// ...rest
		// onChange,
	} = props;

	// const rowDataToChecked = useCallback(
	// 	(rowData) => {
	// 		return rowData === trueValue;
	// 	},
	// 	[trueValue]
	// );

	// const checkedToRowData = useCallback(
	// 	(checked) => {
	// 		return checked ? trueValue : falseValue;
	// 	},
	// 	[falseValue, trueValue]
	// );

	// const ref = useRef();
	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const handleChange = useCallback(
		(e) => {
			// e?.preventDefault();
			const checked = e.target.checked;
			console.log(`checked: ${checked}`, rowDataRef.current);
			// console.log(`columnData`, columnData);
			if (checked) {
				setRowData(trueValue);
			} else {
				setRowData(falseValue);
			}

			// if (onChange) {
			// 	onChange(checked);
			// }
		},
		[falseValue, setRowData, trueValue]
	);

	// useLayoutEffect(() => {
	// 	// console.log(`focus: ${focus}`);
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
			// {...ComponentProps}
		/>
	);
	// }, arePropsEqual);
});

MuiCheckboxColumn.propTypes = {
	// disableRipple: PropTypes.bool,
	disabled: PropTypes.bool,
	trueValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
	falseValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
	focus: PropTypes.bool,
	rowData: PropTypes.any,
	setRowData: PropTypes.func,
	active: PropTypes.bool,
	ComponentProps: PropTypes.object,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

MuiCheckboxColumn.displayName = "MuiCheckboxColumn";
export default MuiCheckboxColumn;
