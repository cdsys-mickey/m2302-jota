import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import FreeProdTypePicker from "@/components/picker/FreeProdTypePicker";
import Objects from "../../../shared-modules/sd-objects";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.id,active,disable,focus",
		debug: true,
	});
};

const FreeProdTypePickerComponent = memo((props) => {
	const {
		// Cell Data
		rowData,
		setRowData,
		// Extra Information
		rowIndex,
		columnIndex,
		columnData,
		// Cell State
		active,
		focus,
		disabled,
		// Control Functions
		stopEditing,
		insertRowBelow,
		duplicateRow,
		deleteRow,
		getContextMenuItems,
	} = props;

	const { ...rest } = columnData;

	const ref = useRef();

	const handleChange = useCallback(
		(newValue) => {
			console.log(`[${columnData?.name}].handleChange`, newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			setTimeout(() => stopEditing({ nextRow: false }), 50);
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

	return (
		<FreeProdTypePicker
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// DSG 專屬屬性
			dense
			hideBorders
			disablePointerEvents={!focus}
			hidePopupIndicator={!focus}
			fadeOutDisabled={false}
			selectOnFocus
			{...rest}
		/>
	);
}, arePropsEqual);

FreeProdTypePickerComponent.propTypes = {
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

FreeProdTypePickerComponent.displayName = "FreeProdTypePickerComponent";
export default FreeProdTypePickerComponent;
