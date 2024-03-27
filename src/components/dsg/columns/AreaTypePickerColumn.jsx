import PropTypes from "prop-types";
import { memo, useLayoutEffect, useRef } from "react";
import AreaTypePicker from "@/components/picker/AreaTypePicker";

const AreaTypePickerColumn = memo((props) => {
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
		duplicateRow,
		deleteRow,
		getContextMenuItems,
		...rest
	} = props;

	const ref = useRef();

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<AreaTypePicker
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={setRowData}
			hideBorders
			{...rest}
		/>
	);
});

AreaTypePickerColumn.propTypes = {
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

AreaTypePickerColumn.displayName = "AreaTypePickerColumn";
export default AreaTypePickerColumn;
