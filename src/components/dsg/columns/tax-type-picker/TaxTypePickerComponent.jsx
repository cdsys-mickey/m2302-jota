import TaxTypePicker from "@/components/picker/TaxTypePicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Constants from "@/modules/md-constants";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.id,active,disabled,focus",
		// debug: true,
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
		isLastRow,
		getNextCell,
		skipDisabled,
		// handleFocusNextCell,
		setActiveCell,
		readOnly,
		focusOnDisabled,
		multiple,
		...rest
	} = columnData;

	const { handleFocusNextCell } = useCellComponent({
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
		insertRowBelow
	});

	// const { ref, hideControls, cell, handleChange, handleOpen, handleClose } = useOptionPickerComponent({
	const pickerProps = useOptionPickerComponent({
		name,
		rowIndex,
		rowData,
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
		handleFocusNextCell,
		focusOnDisabled,
		multiple
	});

	// const cellComponentRef = useRef({
	// 	stopEditing,
	// 	insertRowBelow,
	// 	cell,
	// 	skipDisabled,
	// 	handleFocusNextCell,
	// 	getNextCell,
	// 	lastCell,
	// 	isLastRow,
	// 	setActiveCell,
	// });
	// // sync asyncRef
	// cellComponentRef.current = {
	// 	stopEditing,
	// 	insertRowBelow,
	// 	cell,
	// 	skipDisabled,
	// 	handleFocusNextCell,
	// 	getNextCell,
	// 	lastCell,
	// 	isLastRow,
	// 	setActiveCell,
	// }

	return (
		<TaxTypePicker
			// name={name}
			// label=""
			// inputRef={ref}
			// disabled={disabled}
			// value={rowData}
			// onChange={handleChange}
			// onOpen={handleOpen}
			// onClose={handleClose}
			// DSG 專屬
			// cellComponentRef={cellComponentRef}
			// handleFocusNextCell={handleFocusNextCell}
			// multiple={multiple}
			// dense
			// cell={cell}
			// hideControls={hideControls}
			// hideBorders
			// disableFadeOut
			// toastError
			{...pickerProps}
			{...rest}
			// blurToLookup={false}
			mockDelay={Constants.POPPER_DELAY}
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
