import { useOptionPickerComponent } from "@/shared-hooks/dsg/useOptionPickerComponent";
import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useCallback, useMemo, useRef } from "react";
import { ZZProdCatLPickerContainer } from "../../../picker/ZZProdCatLPickerContainer";
import ProdCatLPicker from "../../../picker/ProdCatLPicker";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.LClas,active,disabled,focus",
		// debug: true,
	});
};


const ProdCatLPickerComponent = memo((props) => {
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
		...rest
	} = columnData;

	const { focusNextCell } = useCellComponent({
		getNextCell,
		lastCell,
		setActiveCell,
		insertRowBelow
	});

	// const handleChange = useCallback(
	// 	(newValue) => {
	// 		if (name) {
	// 			console.log(`${name}.rowData`, rowDataRef.current);
	// 			console.log(`${name}.handleChange, newValue`, newValue);
	// 			const ogValue = rowDataRef.current[name];
	// 			if (newValue?.LClas !== ogValue?.LClas) {
	// 				setRowData({
	// 					...rowDataRef.current,
	// 					[name]: newValue,
	// 					catM: null,
	// 				});
	// 			}
	// 			if (!newValue?.LClas) {
	// 				return;
	// 			}
	// 			setTimeout(() => stopEditing({ nextRow: false }));
	// 		} else {
	// 			console.log(`rowData`, rowDataRef.current);
	// 			console.log(`handleChange, newValue`, newValue);
	// 			setRowData(newValue);
	// 		}
	// 	},
	// 	[name, setRowData, stopEditing]
	// );

	const { ref, hideControls, handleChange, cell } = useOptionPickerComponent({
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
		focusNextCell
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
		<ProdCatLPicker
			name={name}
			label=""
			inputRef={ref}
			// disabled={disabled}
			// value={value}
			value={rowData}
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
		/>
	);
}, arePropsEqual);

ProdCatLPickerComponent.propTypes = {
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
ProdCatLPickerComponent.propTypes = {

}
ProdCatLPickerComponent.displayName = "ProdCatLPickerComponent";
export default ProdCatLPickerComponent;
