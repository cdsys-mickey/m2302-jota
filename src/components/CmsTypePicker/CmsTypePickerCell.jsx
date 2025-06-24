import CmsTypePicker from "@/components/CmsTypePicker/CmsTypePicker";
import { useCellFocus } from "@/shared-hooks/dsg/useCellFocus";
import { useOptionPickerCell } from "@/shared-hooks/dsg/useOptionPickerCell";
import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.CodeID,active,disabled,focus",
		// debug: true,
	});
};

const CmsTypePickerCell = memo((props) => {
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

	const cellFocus = useCellFocus({
		insertRowBelow
	});

	const pickerCellProps = useOptionPickerCell({
		// from props
		column: {
			rowIndex,
			rowData,
			columnIndex,
			focus,
			active,
			disabled,
			setRowData,
			stopEditing,
		},
		// from columnData
		columnData,
		// from cellFocus
		cellFocus,
	});

	return (
		<CmsTypePicker
			queryParam="qs"
			{...pickerCellProps}
		/>
	);
}, arePropsEqual);

CmsTypePickerCell.propTypes = {
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
CmsTypePickerCell.propTypes = {};
CmsTypePickerCell.displayName = "CmsTypePickerCell";
export default CmsTypePickerCell;
