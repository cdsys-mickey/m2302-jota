import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/sd-objects";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.SClas,active,disabled,focus",
		// debug: true,
	});
};

const ProdCatSPickerColumn = memo((props) => {
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

	// const catL = useMemo(() => {
	// 	return rowData["catL"]?.LClas;
	// }, [rowData]);

	// const catM = useMemo(() => {
	// 	return rowData["catM"]?.MClas;
	// }, [rowData]);

	// const disabled = useMemo(() => {
	// 	return !catL || !catM || _disabled;
	// }, [catL, catM, _disabled]);


	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const {
		name,
		hideControlsOnActive,
		selectOnFocus,
		// from Context
		lastCell,
		getNextCell,
		skipDisabled,
		// focusNextCell,
		setActiveCell,
		readOnly,
		focusOnDisabled,
		...rest
	} = columnData;

	const { focusNextCell } = useCellComponent({
		getNextCell,
		lastCell,
		setActiveCell,
		insertRowBelow
	});


	const { ref, hideControls, handleChange, cell } = useOptionPickerComponent({
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
		focusNextCell,
		focusOnDisabled
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

	// const value = useMemo(() => {
	// 	return name ? rowData[name] : rowData;
	// }, [name, rowData]);

	return (
		<ProdCatSPicker
			name={name}
			label=""
			inputRef={ref}
			// catL={catL}
			// catM={catM}
			// disabled={disabled}
			value={rowData}
			// value={value}
			onChange={handleChange}
			// DSG 專屬屬性
			// cellComponentRef={cellComponentRef}
			focusNextCell={focusNextCell}
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

ProdCatSPickerColumn.propTypes = {
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

ProdCatSPickerColumn.displayName = "ProdCatSPickerColumn";
export default ProdCatSPickerColumn;
