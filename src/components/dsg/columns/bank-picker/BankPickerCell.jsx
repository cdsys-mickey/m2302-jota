import BankPicker from "@/components/fields/BankPicker";
import { useCellFocus } from "@/shared-hooks/dsg/useCellFocus";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo, useRef } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.CodeID,active,disabled,focus",
		// debug: true,
	});
};

const BankPickerCell = memo((props) => {
	const {
		// Component Props
		columnData,
		// from cell
		rowData,
		setRowData,
		rowIndex,
		columnIndex,
		active,
		focus,
		disabled,
		stopEditing,
		insertRowBelow,
		// duplicateRow,
		// deleteRow,
		// getContextMenuItems,
	} = props;

	// const rowDataRef = useRef(rowData);
	// rowDataRef.current = rowData;

	const {
		name,
		hideControlsOnActive,
		selectOnFocus,
		multiple,
		...rest
	} = columnData;


	const cellFocus = useCellFocus({
		insertRowBelow
	});

	const pickerProps = useOptionPickerComponent({
		// from props
		rowIndex,
		rowData,
		columnIndex,
		focus,
		active,
		disabled,
		setRowData,
		stopEditing,
		// from columnData
		name,
		hideControlsOnActive,
		selectOnFocus,
		multiple,
		// from cellFocus
		...cellFocus,
	});

	return (
		<BankPicker
			queryParam="qs"
			{...pickerProps}
			{...rest}
		/>
	);
}, arePropsEqual);

BankPickerCell.propTypes = {
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
BankPickerCell.propTypes = {};
BankPickerCell.displayName = "BankPickerCell";
export default BankPickerCell;
