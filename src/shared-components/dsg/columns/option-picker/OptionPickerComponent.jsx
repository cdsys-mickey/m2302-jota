import { memo } from "react";
import OptionPicker from "@/shared-components/option-picker/OptionPicker";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useCallback } from "react";
import Objects from "@/shared-modules/sd-objects";
import { useMemo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData,active,focus",
		debug: true,
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
	} = props;

	const { disableActiveControl, options, ...rest } = columnData;

	const ref = useRef();
	// console.log("rendering OptionPickerComponent");

	const handleChange = useCallback(
		(newValue) => {
			console.log("OptionPickerComponent.handleChange", newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			setTimeout(() => stopEditing({ nextRow: false }), 100);
		},
		[setRowData, stopEditing]
	);

	const hideControls = useMemo(() => {
		return disabled || disableActiveControl ? !focus : !active;
	}, [active, disableActiveControl, disabled, focus]);

	// This function will be called only when `focus` changes
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<OptionPicker
			label=""
			readOnly={disabled}
			inputRef={ref}
			options={options}
			value={rowData}
			onChange={handleChange}
			disabled={disabled}
			// DSG 專屬屬性
			dense
			hideBorders
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!active}
			hideControls={hideControls}
			hidePlaceholder={!active}
			disableFadeOut
			selectOnFocus
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
