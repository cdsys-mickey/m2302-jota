import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useMemo, useRef } from "react";
import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import { useCallback } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.catM.MClas,active,disabled,focus",
		// debug: true,
	});
};

const RowProdCatMPickerComponent = memo((props) => {
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

	const value = useMemo(() => {
		return rowData[name];
	}, [name, rowData]);

	return (
		<ProdCatMPicker
			name={name}
			label=""
			inputRef={ref}
			disabled={disabled}

			// keyColumn 版
			// value={rowData}
			// onChange={handleChange}

			// row 版
			value={value}
			onChange={onChange}
			catL={catL}

			// DSG 專屬屬性
			focusNextCell={focusNextCell}
			// cellComponentRef={cellComponentRef}
			dense
			cell={cell}
			hideControls={hideControls}
			hideBorders
			disableFadeOut
			disableClearable
			toastError
			{...rest}
		/>
	);
}, arePropsEqual);

RowProdCatMPickerComponent.propTypes = {
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

RowProdCatMPickerComponent.displayName = "RowProdCatMPickerComponent";
export default RowProdCatMPickerComponent;