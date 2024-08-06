import PropTypes from "prop-types";
import { memo, useLayoutEffect, useRef } from "react";
import ProdTypeAPicker from "@/components//picker/ProdTypeAPicker";
import { useMemo } from "react";
import { useCallback } from "react";
import Objects from "@/shared-modules/sd-objects";

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
		// insertRowBelow,
		// duplicateRow,
		// deleteRow,
		// getContextMenuItems,
	} = props;

	const ref = useRef();
	const { hideControlsOnActive, ...rest } = columnData;

	const handleChange = useCallback(
		(newValue) => {
			console.log("handleChange", newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			setTimeout(() => stopEditing({ nextRow: false }), 50);
		},
		[setRowData, stopEditing]
	);

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	useLayoutEffect(() => {
		if (active) {
			ref.current?.focus();
			ref.current?.select();
		} else {
			ref.current?.blur();
		}
	}, [active, focus]);

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	return (
		<ProdTypeAPicker
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// DSG 專屬
			toastError
			hideBorders
			dense
			hideControls={hideControls}
			hidePlaceholder={!active}
			disableFadeOut
			cell={cell}
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
