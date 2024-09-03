import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import FreeProdTypePicker from "@/components/picker/FreeProdTypePicker";
import Objects from "@/shared-modules/sd-objects";
import { useMemo } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.id,active,disable,focus",
		debug: true,
	});
};

const FreeProdTypePickerComponent = memo((props) => {
	const {
		// Cell Data
		rowData,
		setRowData,
		// Extra Information
		rowIndex,
		columnIndex,
		columnData,
		// Cell State
		active,
		focus,
		disabled,
		// Control Functions
		stopEditing,
		insertRowBelow,
		duplicateRow,
		deleteRow,
		getContextMenuItems,
	} = props;

	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const {
		hideControlsOnActive,
		selectOnFocus,
		// from Context
		lastCell,
		getNextCell,
		skipDisabled,
		nextCell,
		setActiveCell,
		readOnly,
		...rest
	} = columnData;

	const { ref, hideControls, cell, handleChange } = useOptionPickerComponent({
		rowIndex,
		columnIndex,
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		setRowData,
		stopEditing,
		readOnly
	});

	const cellComponentRef = useRef({
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled,
		nextCell,
		getNextCell,
		lastCell,
		setActiveCell,
	});
	// sync asyncRef
	cellComponentRef.current = {
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled,
		nextCell,
		getNextCell,
		lastCell,
		setActiveCell,
	}

	return (
		<FreeProdTypePicker
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			placeholder="試/贈/樣"
			// DSG 專屬屬性
			cellComponentRef={cellComponentRef}
			dense
			cell={cell}
			hideControls={hideControls}
			hideBorders
			disableFadeOut
			toastError
			{...rest}
		/>
	);
}, arePropsEqual);

FreeProdTypePickerComponent.propTypes = {
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

FreeProdTypePickerComponent.displayName = "FreeProdTypePickerComponent";
export default FreeProdTypePickerComponent;
