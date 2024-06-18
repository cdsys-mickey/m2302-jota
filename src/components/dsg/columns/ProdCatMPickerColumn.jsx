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
		// rowIndex,
		// Component Props
		// columnIndex,
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

	const disabled = useMemo(() => {
		return !catL || columnDisabled;
	}, [catL, columnDisabled]);

	// const { disableActiveControl,  ...rest } = columnData;

	const ref = useRef();
	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const handleChange = useCallback(
		(newValue) => {
			if (name) {
				console.log(`${name}.rowData`, rowDataRef.current);
				console.log(`${name}.handleChange, newValue`, newValue);
				const ogValue = rowDataRef.current[name];
				if (newValue?.MClas !== ogValue?.MClas) {
					setRowData({
						...rowDataRef.current,
						[name]: newValue,
						// ...(newValue && {
						catS: null,
						// }),
					});
				}
			} else {
				console.log(`rowData`, rowDataRef.current);
				console.log(`handleChange, newValue`, newValue);
				setRowData(newValue);
			}
		},
		[name, setRowData]
	);

	// const hideControls = useMemo(() => {
	// 	return disableActiveControl ? !focus : !active;
	// }, [active, disableActiveControl, focus]);

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
			disabled={disabled}
			value={name ? rowData[name] : rowData}
			onChange={handleChange}
			catL={catL}
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
