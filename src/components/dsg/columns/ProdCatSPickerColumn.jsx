import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import ProdCatSPickerContainer from "../../picker/ProdCatSPickerContainer";
import { useMemo } from "react";

const ProdCatSPickerColumn = memo((props) => {
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

	const catM = useMemo(() => {
		return rowData["catM"]?.MClas;
	}, [rowData]);

	const readOnly = useMemo(() => {
		return !catL || !catM || disabled;
	}, [catL, catM, disabled]);

	const ref = useRef();

	const handleChange = useCallback(
		(newValue) => {
			console.log(
				`${name}.[${rowIndex}, ${columnIndex}]rowData`,
				rowData
			);
			console.log(`${name}.newValue`, newValue);
			if (catL && catM) {
				setRowData({
					...rowData,
					[name]: newValue,
				});
			}
		},
		[catL, catM, columnIndex, name, rowData, rowIndex, setRowData]
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
		<ProdCatSPickerContainer
			label=""
			hideBorders
			inputRef={ref}
			catL={catL}
			catM={catM}
			disabled={disabled}
			readOnly={readOnly}
			value={rowData[name]}
			onChange={handleChange}
			{...rest}
		/>
	);
});

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
