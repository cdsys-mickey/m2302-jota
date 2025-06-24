import AreaTypePicker from "@/components/AreaPicker/AreaTypePicker";
import Constants from "@/modules/md-constants";
import { useCellFocus } from "@/shared-hooks/dsg/useCellFocus";
import { useOptionPickerCell } from "@/shared-hooks/dsg/useOptionPickerCell";
import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.id,active,disable,focus",
		// debug: true,
	});
};

const AreaTypePickerCell = memo((props) => {
	const {
		// Component Props
		columnData,
		// from column
		rowIndex,
		rowData,
		setRowData,
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


	const cellFocus = useCellFocus({
		insertRowBelow
	});

	const pickerCellProps = useOptionPickerCell({
		// from column
		column: {
			rowIndex,
			rowData,
			setRowData,
			columnIndex,
			active,
			focus,
			disabled,
			stopEditing
		},
		// from columnData
		columnData,
		// from cellFocus
		cellFocus,
	});


	return (
		<AreaTypePicker
			virtualize
			{...pickerCellProps}
			{...Constants.STATIC_PICKER_OPTS}
		/>
	);
}, arePropsEqual);

AreaTypePickerCell.propTypes = {
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

AreaTypePickerCell.displayName = "AreaTypePickerCell";
export default AreaTypePickerCell;
