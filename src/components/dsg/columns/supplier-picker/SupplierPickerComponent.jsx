import SupplierPicker from "@/components/picker/SupplierPicker";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useRef } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.FactID,active,disabled,focus",
		debug: true,
	});
};

const SupplierPickerComponent = memo((props) => {
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
		focusNextCell,
		setActiveCell,
		readOnly,
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
		readOnly
	});

	const cellComponentRef = useRef({
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled,
		focusNextCell,
		getNextCell,
		lastCell,
		setActiveCell,
	});
	// sync asyncRef
	cellComponentRef.current = {
		stopEditing,
		insertRowBelow,
		cell,
		skipDisabled,
		focusNextCell,
		getNextCell,
		lastCell,
		setActiveCell,
	}

	return (
		<SupplierPicker
			queryParam="qs"
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder="供應商"
			typeToSearchText="請輸入編號或名稱進行搜尋"
			// filterByServer
			// queryRequired
			// virtualize
			// DSG 專屬屬性
			cellComponentRef={cellComponentRef}
			cell={cell}
			dense
			hideControls={hideControls}
			hideBorders
			disableFadeOut
			toastError
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!active}
			// hidePlaceholder={!active}
			{...rest}
		/>
	);
}, arePropsEqual);

SupplierPickerComponent.propTypes = {
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
SupplierPickerComponent.propTypes = {};
SupplierPickerComponent.displayName = "SupplierPickerComponent";
export default SupplierPickerComponent;
