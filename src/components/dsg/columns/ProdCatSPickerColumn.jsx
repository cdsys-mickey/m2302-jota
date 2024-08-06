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
		// rowIndex,
		// columnIndex,
		// Component Props
		columnData,
		// Cell state
		active,
		focus,
		disabled: columnDisabled,
		// Control functions
		// stopEditing,
		// insertRowBelow,
		// duplicateRow,
		// deleteRow,
		// getContextMenuItems,
		...rest
	} = props;

	const catL = useMemo(() => {
		return rowData["catL"]?.LClas;
	}, [rowData]);

	const catM = useMemo(() => {
		return rowData["catM"]?.MClas;
	}, [rowData]);

	const disabled = useMemo(() => {
		return !catL || !catM || columnDisabled;
	}, [catL, catM, columnDisabled]);

	// const { hideControlsOnActive, ...rest } = columnData;

	const ref = useRef();
	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const handleChange = useCallback(
		(newValue) => {
			if (name) {
				console.log(`${name}.rowData`, rowDataRef.current);
				console.log(`${name}.handleChange, newValue`, newValue);

				setRowData({
					...rowDataRef.current,
					[name]: newValue,
				});
			} else {
				console.log(`rowData`, rowDataRef.current);
				console.log(`handleChange, newValue`, newValue);

				setRowData(newValue);
			}
		},
		[name, setRowData]
	);

	// const hideControls = useMemo(() => {
	// 	return hideControlsOnActive ? !focus : !active;
	// }, [active, hideControlsOnActive, focus]);

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
			value={rowData[name]}
			onChange={handleChange}
			// DSG 專屬屬性
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!active}
			hideControls={active}
			hidePlaceholder={!active}
			disableFadeOut
			selectOnFocus
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
