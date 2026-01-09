import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo, useCallback, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import G10DocPicker from "../G10DocPicker/G10DocPicker";
import { useCellFocus } from "@/shared-hooks/dsg/useCellFocus";
import G10 from "../G10.mjs";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.SDocID,active,disabled,focus",
		// debug: true,
	});
};

const G10DocPickerCell = memo((props) => {
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

	const handleBeforeFindByInput = useCallback((input) => {
		return G10.expandInput(input);
	}, []);

	return (
		<G10DocPicker
			queryParam="qs"
			inDSG={inDSG}
			onBeforeFindByInput={handleBeforeFindByInput}
			placeholder="以s或r開頭輸入"
			{...pickerProps}
			{...rest}
		// blurToLookup={false}
		/>
	);
}, arePropsEqual);

G10DocPickerCell.propTypes = {
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
G10DocPickerCell.propTypes = {};
G10DocPickerCell.displayName = "G10DocPickerCell";
export default G10DocPickerCell;
