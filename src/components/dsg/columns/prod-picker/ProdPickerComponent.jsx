import ProdPicker from "@/components/picker/ProdPicker";
import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: ProdPickerComponent.displayName,
		fields: "rowData.ProdID,active,disabled,focus",
		// debug: true,
	});
};

const ProdPickerComponent = memo((props) => {
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
		// Context
	} = props;

	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const {
		name,
		hideControlsOnActive,
		selectOnFocus = true,
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
		<ProdPicker
			// name={name}
			// label=""
			queryParam="qs"
			// inputRef={ref}
			// disabled={disabled}
			// value={rowData}
			// onChange={handleChange}
			// onOpen={handleOpen}
			// onClose={handleClose}
			// placeholder="輸入編號、條碼或名稱搜尋"
			// typeToSearchText="輸入編號、條碼或名稱搜尋..."
			// filterByServer
			// queryRequired

			// FocusControl
			// cellComponentRef={cellComponentRef}
			// handleFocusNextCell={handleFocusNextCell}
			// multiple={multiple}
			// dense
			// cell={cell}
			// hideControls={hideControls}
			// hideBorders
			// disableFadeOut
			// toastError
			// autoHighlight
			disableOpenOnInput
			// selectOnFocus
			// 大量資料專用
			virtualize
			// triggerDelay={100}
			{...pickerProps}
			{...rest}
		// blurToLookup={false}
		/>
	);
}, arePropsEqual);

ProdPickerComponent.propTypes = {
	// name: PropTypes.string,
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
	handleFocusNextCell: PropTypes.func,
	skipDisabled: PropTypes.bool,
	lastCell: PropTypes.symbol,
};
ProdPickerComponent.propTypes = {};
ProdPickerComponent.displayName = "ProdPickerComponent";
export default ProdPickerComponent;
