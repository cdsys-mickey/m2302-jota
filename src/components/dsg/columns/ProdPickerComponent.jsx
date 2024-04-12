import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
import { useMemo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return false;
};

const ProdPickerComponent = memo((props) => {
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
		duplicateRow,
		deleteRow,
		getContextMenuItems,
	} = props;

	const { name, ...rest } = columnData;

	// console.log(
	// 	`rendering ProdPickerComponent active: ${active}, focus: ${focus}, rowData:`,
	// 	rowData
	// );

	const ref = useRef();
	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const handleChange = useCallback(
		(newValue) => {
			console.log("handleChange", newValue);
			if (name) {
				console.log(`[${name}] old rowData`, rowDataRef.current);
				console.log(`[${name}].handleChange, newValue`, newValue);
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
			// ref.current?.blur();
			// stopEditing();
			// stopEditing({ nextRow: false });
		},
		[name, setRowData]
	);

	const handleClose = useCallback(() => {
		stopEditing({ nextRow: false });
		console.log("handleClose");
		// ref.current?.blur();
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

	const value = useMemo(() => {
		return name ? rowData?.[name] || "" : rowData;
	}, [name, rowData]);

	return (
		<ProdPickerContainer
			name={name}
			queryParam="qs"
			label=""
			hideBorders
			inputRef={ref}
			disabled={disabled}
			value={value}
			onChange={handleChange}
			onClose={handleClose}
			placeholder="商品"
			typeToSearchText="請輸入商品編號或名稱進行搜尋"
			filterByServer
			queryRequired
			{...rest}
		/>
	);
}, arePropsEqual);

ProdPickerComponent.propTypes = {
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
ProdPickerComponent.propTypes = {};
ProdPickerComponent.displayName = "ProdPickerComponent";
export default ProdPickerComponent;
