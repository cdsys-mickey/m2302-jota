import PropTypes from "prop-types";
import { memo, useLayoutEffect, useRef } from "react";
import ProdTypeAPicker from "@/components//picker/ProdTypeAPicker";
import { useMemo } from "react";
import { useCallback } from "react";
import Objects from "@/shared-modules/sd-objects";
import { useOptionPickerComponent } from "../../../shared-hooks/dsg/useOptionPickerComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.TypeA,active,disabled,focus",
		debug: true,
	});
};

const ProdTypeAPickerComponent = memo((props) => {
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
		hideControlsOnActive,
		selectOnFocus,
		// from Context
		lastCell,
		getNextCell,
		skipDisabled,
		nextCell,
		setActiveCell,
		...rest
	} = columnData;

	const { ref, hideControls, cell, handleChange } = useOptionPickerComponent({
		rowIndex,
		columnIndex,
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		setRowData,
		stopEditing,
	});

	const cellComponentRef = useRef({
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled: skipDisabled,
		nextCell: nextCell,
		getNextCell: getNextCell,
		lastCell: lastCell,
		setActiveCell: setActiveCell,
	});

	return (
		<ProdTypeAPicker
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// DSG 專屬
			cellComponentRef={cellComponentRef}
			dense
			cell={cell}
			hideControls={hideControls}
			// hidePlaceholder={!active}
			hideBorders
			disableFadeOut
			toastError
			{...rest}
		/>
	);
}, arePropsEqual);

ProdTypeAPickerComponent.propTypes = {
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

ProdTypeAPickerComponent.displayName = "ProdTypeAPickerComponent";
export default ProdTypeAPickerComponent;
