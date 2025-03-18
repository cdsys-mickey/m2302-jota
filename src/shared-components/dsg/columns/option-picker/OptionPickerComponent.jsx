import { memo } from "react";
import OptionPicker from "@/shared-components/option-picker/OptionPicker";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useCallback } from "react";
import Objects from "@/shared-modules/Objects";
import { useMemo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData,active,focus",
		// debug: true,
	});
};

const OptionPickerComponent = memo((props) => {
	const {
		columnData,
		/** BUILT-IN PROPS */
		focus,
		rowData,
		setRowData,
		active,
		stopEditing,
		disabled,
		rowIndex,
		columnIndex,
	} = props;

	const { hideControlsOnActive, options, ...rest } = columnData;

	const inputRef = useRef();
	// console.log("rendering OptionPickerComponent");

	const handleChange = useCallback(
		(newValue) => {
			console.log("OptionPickerComponent.handleChange", newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			// setTimeout(() => stopEditing({ nextRow: false }), 50);
			// stopEditing in next event cycle
			setTimeout(() => stopEditing({ nextRow: false }));
		},
		[setRowData, stopEditing]
	);

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	// This function will be called only when `focus` changes
	useLayoutEffect(() => {
		if (focus) {
			inputRef.current?.focus();
		} else {
			inputRef.current?.blur();
		}
	}, [focus]);

	return (
		<OptionPicker
			label=""
			readOnly={disabled}
			inputRef={inputRef}
			options={options}
			value={rowData}
			onChange={handleChange}
			disabled={disabled}
			// DSG 專屬屬性
			dense
			hideBorders
			toastError
			hideControls={hideControls}
			// hidePlaceholder={!active}
			disableFadeOut
			cell={cell}
			{...rest}
		/>
	);
}, arePropsEqual);

OptionPickerComponent.propTypes = {
	// Data
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	setRowData: PropTypes.func,
	// Extra information
	rowIndex: PropTypes.number,
	columnIndex: PropTypes.number,
	columnData: PropTypes.object,
	// Cell state
	active: PropTypes.bool,
	focus: PropTypes.bool,
	disabled: PropTypes.bool,

	// Control functions
	stopEditing: PropTypes.func,
	insertRowBelow: PropTypes.func,
	duplicateRow: PropTypes.func,
	deleteRow: PropTypes.func,
	getContextMenuItems: PropTypes.func,
};

OptionPickerComponent.displayName = "OptionPickerComponent";
export default OptionPickerComponent;
