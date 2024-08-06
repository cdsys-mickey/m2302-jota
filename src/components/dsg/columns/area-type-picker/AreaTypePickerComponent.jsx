import PropTypes from "prop-types";
import { memo, useLayoutEffect, useRef } from "react";
import AreaTypePicker from "@/components/picker/AreaTypePicker";
import { useCallback } from "react";
import Objects from "../../../../shared-modules/sd-objects";
import { useMemo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.id,active,disable,focus",
		debug: true,
	});
};

const AreaTypePickerComponent = memo((props) => {
	const {
		// Data
		rowData,
		setRowData,
		// Extra information
		// rowIndex,
		// columnIndex,
		// Component Props
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

	const { hideControlsOnActive, ...rest } = columnData;

	const ref = useRef();

	const handleChange = useCallback(
		(newValue) => {
			console.log(`[${columnData?.name}].handleChange`, newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			setTimeout(() => stopEditing({ nextRow: false }), 100);
		},
		[columnData?.name, setRowData, stopEditing]
	);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);

	return (
		<AreaTypePicker
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// DSG 專屬屬性
			dense
			hideBorders
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!focus}
			hideControls={hideControls}
			hidePlaceholder={!focus}
			disableFadeOut
			selectOnFocus
			{...rest}
		/>
	);
}, arePropsEqual);

AreaTypePickerComponent.propTypes = {
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

AreaTypePickerComponent.displayName = "AreaTypePickerComponent";
export default AreaTypePickerComponent;
