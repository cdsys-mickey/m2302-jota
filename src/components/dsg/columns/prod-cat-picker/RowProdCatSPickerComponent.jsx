import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/Objects.mjs";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import { useMemo } from "react";
import { useCallback } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.catS.SClas,active,disabled,focus",
		// debug: true,
	});
};

const RowProdCatSPickerComponent = memo((props) => {
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
		isLastRow,
		getNextCell,
		skipDisabled,
		// handleFocusNextCell,
		setActiveCell,
		readOnly,
		...rest
	} = columnData;

	// const { handleFocusNextCell } = useCellComponent({
	// 	getNextCell,
	// 	lastCell,
	// 	isLastRow,
	// 	setActiveCell,
	// 	insertRowBelow
	// });


	const { value: rowValue, onChange: handleChange, ...pickerProps } = useOptionPickerComponent({
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
		// handleFocusNextCell
	});

	console.log("ignores props", rowValue);

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

	const onChange = useCallback((newValue) => {
		const oldValue = rowData[name];
		if (newValue !== oldValue) {
			handleChange({
				...rowData,
				[name]: newValue
			});

		}
	}, [handleChange, name, rowData]);


	const catL = useMemo(() => {
		return rowData.catL?.LClas;
	}, [rowData.catL?.LClas])

	const catM = useMemo(() => {
		return rowData.catM?.MClas;
	}, [rowData.catM?.MClas])

	const value = useMemo(() => {
		return rowData[name];
	}, [name, rowData]);


	return (
		<ProdCatSPicker
			name={name}
			label=""
			// inputRef={inputRef}

			// keyColumn 版
			// value={rowData}
			// onChange={handleChange}

			// row 版
			catL={catL}
			catM={catM}
			value={value}
			onChange={onChange}
			// onOpen={handleOpen}
			// onClose={handleClose}

			// DSG 專屬屬性
			// handleFocusNextCell={handleFocusNextCell}
			// cellComponentRef={cellComponentRef}
			dense
			// cell={cell}
			// hideControls={hideControls}
			// hideBorders
			// disableFadeOut
			// disableClearable
			// toastError
			// {...rest}
			// blurToLookup={false}
			{...pickerProps}
			{...rest}
		/>
	);
}, arePropsEqual);

RowProdCatSPickerComponent.propTypes = {
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

RowProdCatSPickerComponent.displayName = "RowProdCatSPickerComponent";
export default RowProdCatSPickerComponent;
