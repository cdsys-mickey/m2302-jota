import AreaTypePicker from "@/components/picker/AreaTypePicker";
import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/sd-objects";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.id,active,disable,focus",
		debug: true,
	});
};

const AreaTypePickerComponent = memo((props) => {
	const {
		// Data
		rowData,
		setRowData,
		// Extra information
		rowIndex,
		columnIndex,
		// Component Props
		columnData,
		// Cell state
		active,
		focus,
		disabled,
		// Control functions
		stopEditing,
		insertRowBelow,
		// duplicateRow,
		// deleteRow,
		// getContextMenuItems,
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
	});

	const cellComponentRef = useRef({
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled: skipDisabled,
		nextCell: nextCell,
		getNextCell: getNextCell,
		lastCell: lastCell,
		setActiveCell: setActiveCell,
	});

	return (
		<AreaTypePicker
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// DSG 專屬屬性
			cellComponentRef={cellComponentRef}
			cell={cell}
			dense
			hideControls={hideControls}
			hideBorders
			disableFadeOut
			toastError
			{...rest}
		/>
	);
}, arePropsEqual);

AreaTypePickerComponent.propTypes = {
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

AreaTypePickerComponent.displayName = "AreaTypePickerComponent";
export default AreaTypePickerComponent;
