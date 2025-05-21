import RecvAcctDocPicker from "@/components/RecvAcctDocPicker/RecvAcctDocPicker";
import { useCellFocus } from "@/shared-hooks/dsg/useCellFocus";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/Objects";
import PropTypes from "prop-types";
import { memo, useRef } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.DocID,active,disabled,focus",
		// debug: true,
	});
};

const RecvAcctDocPickerCell = memo((props) => {
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
		name,
		hideControlsOnActive,
		selectOnFocus,
		// from Context
		// isLastRow,
		// getNextCell,
		// skipDisabled,
		// setActiveCell,

		// readOnly,
		// focusOnDisabled,
		// lastCell,

		multiple,
		...rest
	} = columnData;

	// const { handleFocusNextCell } = useCellComponent({
	// 	getNextCell,
	// 	lastCell,
	// 	isLastRow,
	// 	setActiveCell,
	// 	insertRowBelow
	// });
	const { handleFocusNextCell, skipDisabled, readOnly, focusOnDisabled, inDSG } = useCellFocus({
		// getNextCell,
		// lastCell,
		// isLastRow,
		// setActiveCell,
		insertRowBelow
	});

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

	return (
		<RecvAcctDocPicker
			queryParam="qs"
			inDSG={inDSG}
			{...pickerProps}
			{...rest}
		// blurToLookup={false}
		/>
	);
}, arePropsEqual);

RecvAcctDocPickerCell.propTypes = {
	name: PropTypes.string,
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
RecvAcctDocPickerCell.propTypes = {};
RecvAcctDocPickerCell.displayName = "RecvAcctDocPickerCell";
export default RecvAcctDocPickerCell;
