import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import ProdPicker from "../../../picker/ProdPicker";

const A22GridProdPickerColumn = memo((props) => {
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

	const ref = useRef();
	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const handleChange = useCallback(
		(newValue) => {
			if (name) {
				console.log(`${name}.rowData`, rowDataRef.current);
				console.log(`${name}.handleChange, newValue`, newValue);
				const ogValue = rowDataRef.current[name];
				if (newValue?.ProdID !== ogValue?.ProdID) {
					setRowData({
						...rowDataRef.current,
						[name]: newValue,
						Barcode: newValue?.Barcode,
						PackData: newValue?.PackData_N,
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

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<ProdPicker
			name={name}
			withSalesPackageName
			queryParam="qs"
			label=""
			hideBorders
			inputRef={ref}
			disabled={disabled}
			value={name ? rowData[name] : rowData}
			onChange={handleChange}
			placeholder="關連商品"
			typeToSearchText="請輸入商品編號或名稱進行搜尋"
			filterByServer
			queryRequired
			{...rest}
		/>
	);
});

A22GridProdPickerColumn.propTypes = {
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
A22GridProdPickerColumn.propTypes = {
	withBomPackageName: PropTypes.bool,
};
A22GridProdPickerColumn.displayName = "A22GridProdPickerColumn";
export default A22GridProdPickerColumn;
