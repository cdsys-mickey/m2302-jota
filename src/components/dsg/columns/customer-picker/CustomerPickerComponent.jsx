import CustomerPicker from "@/components/picker/CustomerPicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/Objects";
import PropTypes from "prop-types";
import { memo, useRef } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.CustID,active,disabled,focus",
		// debug: true,
	});
};

const CustomerPickerComponent = memo((props) => {
	const {
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
		// rest
		placeholder = "客戶代碼",
	} = props;

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
		// handleFocusNextCell,
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
		// handleFocusNextCell,
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
	}

	return (
		<CustomerPicker
			name={name}
			queryParam="qs"
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			onOpen={handleOpen}
			onClose={handleClose}
			placeholder={placeholder}
			typeToSearchText="請輸入編號或名稱進行搜尋"
			// filterByServer
			// queryRequired
			// virtualize
			// DSG 專屬屬性
			// cellComponentRef={cellComponentRef}
			handleFocusNextCell={handleFocusNextCell}
			cell={cell}
			dense
			hideControls={hideControls}
			hideBorders
			disableFadeOut
			toastError
			autoHighlight
			disableOpenOnInput
			selectOnFocus
			// 大量資料專用
			virtualize
			triggerDelay={100}
			{...rest}
			blurToLookup={false}
		/>
	);
}, arePropsEqual);

CustomerPickerComponent.propTypes = {
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

	placeholder: PropTypes.string,
};
CustomerPickerComponent.propTypes = {};
CustomerPickerComponent.displayName = "CustomerPickerComponent";
export default CustomerPickerComponent;
