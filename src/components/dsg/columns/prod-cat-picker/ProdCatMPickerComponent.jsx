import Objects from "@/shared-modules/Objects";
import PropTypes from "prop-types";
import { memo, useMemo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.MClas,active,disabled,focus",
		// debug: true,
	});
};

const ProdCatMPickerComponent = memo((props) => {
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
		disabled: _disabled,
		// Control functions
		stopEditing,
		insertRowBelow,
		// duplicateRow,
		// deleteRow,
		// getContextMenuItems,
	} = props;

	// const catL = useMemo(() => {
	// 	return rowData["catL"]?.LClas;
	// }, [rowData]);

	// const disabled = useMemo(() => {
	// 	return !catL || _disabled;
	// }, [catL, _disabled]);
	const disabled = useMemo(() => {
		return _disabled;
	}, [_disabled]);

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
		...rest
	} = columnData;

	const { handleFocusNextCell } = useCellComponent({
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
		insertRowBelow
	});

	const { ref, hideControls, cell, handleChange, handleOpen, handleClose } = useOptionPickerComponent({
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
		handleFocusNextCell,
		focusOnDisabled
	});

	const cellComponentRef = useRef({
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled,
		handleFocusNextCell,
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
	});
	// sync asyncRef
	cellComponentRef.current = {
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled,
		handleFocusNextCell,
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
	}

	// const value = useMemo(() => {
	// 	return name ? rowData[name] : rowData;
	// }, [name, rowData]);

	return (
		<ProdCatMPicker
			name={name}
			label=""
			inputRef={ref}
			disabled={disabled}
			// value={value}
			value={rowData}
			onChange={handleChange}
			onOpen={handleOpen}
			onClose={handleClose}
			// catL={catL}
			// DSG 專屬屬性
			// cellComponentRef={cellComponentRef}
			handleFocusNextCell={handleFocusNextCell}
			dense
			cell={cell}
			hideControls={hideControls}
			hideBorders
			disableFadeOut
			disableClearable
			toastError
			{...rest}
			blurToLookup={false}
		/>
	);
}, arePropsEqual);

ProdCatMPickerComponent.propTypes = {
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

ProdCatMPickerComponent.displayName = "ProdCatMPickerComponent";
export default ProdCatMPickerComponent;
