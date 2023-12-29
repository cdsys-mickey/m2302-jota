import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import ProdCatMPickerContainer from "../../picker/ProdCatMPickerContainer";
import { useMemo } from "react";

const ProdCatMPickerColumn = memo((props) => {
	const {
		name,
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
		duplicateRow,
		deleteRow,
		getContextMenuItems,
		...rest
	} = props;

	const catL = useMemo(() => {
		return rowData["catL"]?.LClas;
	}, [rowData]);

	const readOnly = useMemo(() => {
		return !catL || disabled;
	}, [catL, disabled]);

	const ref = useRef();

	const handleChange = useCallback(
		(newValue) => {
			console.log(
				`${name}.[${rowIndex}, ${columnIndex}]rowData`,
				rowData
			);
			console.log(`${name}.newValue`, newValue);
			if (catL) {
				setRowData({
					...rowData,
					[name]: newValue,
					catS: null,
				});
			}
		},
		[catL, columnIndex, name, rowData, rowIndex, setRowData]
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
		<ProdCatMPickerContainer
			label=""
			hideBorders
			inputRef={ref}
			readOnly={readOnly}
			disabled={disabled}
			value={rowData[name]}
			onChange={handleChange}
			catL={catL}
			{...rest}
		/>
	);
});

ProdCatMPickerColumn.propTypes = {
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

ProdCatMPickerColumn.displayName = "ProdCatMPickerColumn";
export default ProdCatMPickerColumn;
