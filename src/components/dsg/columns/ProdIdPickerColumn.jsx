import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
import { ProdIdPickerContainer } from "../../picker/ProdIdPickerContainer";

const arePropsEqual = (oldProps, newProps) => {
	if (oldProps.ProdID === newProps.ProdID) {
		return true;
	}
	return false;
};

const ProdIdPickerColumn = memo((props) => {
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

	// console.log("rendering ProdIdPickerColumn", rowData);

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
						SPackData_N: newValue?.PackData_N,
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

	const handleClose = useCallback(() => {
		stopEditing();
		console.log("stopEditing");
	}, [stopEditing]);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
			console.log("focus");
		} else {
			ref.current?.blur();
			console.log("blur");
		}
	}, [focus]);

	return (
		<ProdIdPickerContainer
			name={name}
			queryParam="qs"
			label=""
			hideBorders
			inputRef={ref}
			disabled={disabled}
			value={name ? rowData[name] : rowData}
			onChange={handleChange}
			placeholder="商品"
			typeToSearchText="請輸入商品編號或名稱進行搜尋"
			filterByServer
			{...rest}
		/>
	);
}, arePropsEqual);

ProdIdPickerColumn.propTypes = {
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
ProdIdPickerColumn.propTypes = {};
ProdIdPickerColumn.displayName = "ProdIdPickerColumn";
export default ProdIdPickerColumn;
