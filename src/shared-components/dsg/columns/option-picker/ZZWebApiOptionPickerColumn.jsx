import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import WebApiOptionPicker from "../../../option-picker/WebApiOptionPicker";
import Objects from "../../../../shared-modules/sd-objects";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: ["rowData", "active", "disabled", "focus"],
		debug: true,
	});
};

const WebApiOptionPickerColumn = memo((props) => {
	const {
		name,
		componentProps,
		/** BUILT-IN PROPS */
		focus,
		rowData,
		setRowData,
		rowIndex,
		columnIndex,
		active,
		stopEditing,
		disabled,
		onChange,
	} = props;
	// console.log(
	// 	`rendering WebApiOptionPickerColumn ${name}[${rowIndex}]`
	// 	// props
	// );
	// console.log(`rowData`, rowData);
	// console.log(`columnIndex: ${columnIndex}, rowIndex: ${rowIndex}`);
	const ref = useRef();

	const handleChange = useCallback(
		(newValue) => {
			// if (name) {
			// 	setRowData({
			// 		...rowData,
			// 		[name]: newValue,
			// 	});
			// } else {
			// 	setRowData(newValue);
			// }

			if (onChange) {
				onChange({ rowData, setRowData, newValue });
			} else {
				setRowData(newValue);
			}
		},
		[onChange, rowData, setRowData]
	);

	const handleClose = useCallback(() => {
		stopEditing();
		console.log("stopEditing");
	}, [stopEditing]);

	// focusing on underlying input component when cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
			// handleClose();
		}
	}, [focus]);

	return (
		<WebApiOptionPicker
			disabled={disabled}
			inputRef={ref}
			hideBorders
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			{...componentProps}
		/>
	);
}, arePropsEqual);

WebApiOptionPickerColumn.propTypes = {
	focus: PropTypes.bool,
	name: PropTypes.string,
	url: PropTypes.string,
	componentProps: PropTypes.object,
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	setRowData: PropTypes.func,
	active: PropTypes.bool,
	stopEditing: PropTypes.func,
	disabled: PropTypes.bool,
};

WebApiOptionPickerColumn.displayName = "WebApiOptionPickerColumn";
export default WebApiOptionPickerColumn;
