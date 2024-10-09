import TaxTypePicker from "@/components/picker/TaxTypePicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.taxType,active,disabled,focus",
		debug: true,
	});
}

const TaxTypePickerComponent = memo((props) => {
	const {
		// Data
		rowData,
		setRowData,
		// Extra information
		rowIndex,
		columnIndex,
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
		focusNextCell,
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
		focusNextCell,
		getNextCell,
		lastCell,
		setActiveCell,
	}

	return (
		<TaxTypePicker
			name={name}
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// DSG 專屬
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

TaxTypePickerComponent.propTypes = {
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

TaxTypePickerComponent.displayName = "TaxTypePickerComponent";
export default TaxTypePickerComponent;
