import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { memo, useCallback, useMemo } from "react";
import Objects from "@/shared-modules/Objects.mjs";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "MuiCheckboxComponent",
		fields: "rowData,active,focus,disabled",
		// debug: true,
	});
};

const MuiCheckboxComponent = memo((props) => {
	console.log("rendering MuiCheckboxComponent");
	const {
		columnData,
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

	const { trueValue, falseValue } = columnData;

	// console.log("rendering MuiCheckboxComponent");

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
}, arePropsEqual);

MuiCheckboxComponent.propTypes = {
	// disableRipple: PropTypes.bool,
	disabled: PropTypes.bool,
	columnData: PropTypes.object,
	// trueValue: PropTypes.oneOfType([
	// 	PropTypes.string,
	// 	PropTypes.number,
	// 	PropTypes.bool,
	// ]),
	// falseValue: PropTypes.oneOfType([
	// 	PropTypes.string,
	// 	PropTypes.number,
	// 	PropTypes.bool,
	// ]),
	focus: PropTypes.bool,
	rowData: PropTypes.any,
	setRowData: PropTypes.func,
	active: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

MuiCheckboxComponent.displayName = "MuiCheckboxComponent";
export default MuiCheckboxComponent;
