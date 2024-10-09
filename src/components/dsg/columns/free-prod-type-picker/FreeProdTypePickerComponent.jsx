import FreeProdTypePicker from "@/components/picker/FreeProdTypePicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useRef } from "react";

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
		name,
		hideControlsOnActive,
		selectOnFocus,
		// from Context
		lastCell,
		getNextCell,
		skipDisabled,
		// focusNextCell,
		setActiveCell,
		readOnly,
		...rest
	} = columnData;

	const { focusNextCell } = useCellComponent({
		getNextCell,
		lastCell,
		setActiveCell,
		insertRowBelow
	});

	const { ref, hideControls, cell, handleChange } = useOptionPickerComponent({
		name,
		rowIndex,
		columnIndex,
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		setRowData,
		stopEditing,
		readOnly,
		skipDisabled,
		focusNextCell
	});

	const cellComponentRef = useRef({
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled,
		// focusNextCell,
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
		// focusNextCell,
		getNextCell,
		lastCell,
		setActiveCell,
	}

	return (
		<FreeProdTypePicker
			name={name}
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// placeholder="試贈樣"
			// DSG 專屬屬性
			// cellComponentRef={cellComponentRef}
			focusNextCell={focusNextCell}
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
