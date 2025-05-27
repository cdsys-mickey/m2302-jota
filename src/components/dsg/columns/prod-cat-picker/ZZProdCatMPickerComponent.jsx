import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import ProdCatMPicker from "../../../picker/ProdCatMPicker";
import { useMemo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.MClas,active,disabled,focus",
		debug: true,
	});
};

const ProdCatMPickerComponent = memo((props) => {
	const {
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
		disabled,
		// Control functions
		stopEditing,
		// insertRowBelow,
		// duplicateRow,
		// deleteRow,
		// getContextMenuItems,
	} = props;

	const { hideControlsOnActive, ...rest } = columnData;

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
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			setTimeout(() => stopEditing({ nextRow: false }), 50);
		},
		[setRowData, stopEditing]
	);

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<ProdCatMPicker
			queryParam="qs"
			label=""
			hideBorders
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder="商品"
			// typeToSearchText="請輸入商品編號或名稱進行搜尋"
			// filterByServer
			// DSG 專屬屬性
			dense
			hideControls={hideControls}
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!active}
			// hidePlaceholder={!active}
			disableFadeOut
			selectOnFocus
			{...rest}
		/>
	);
}, arePropsEqual);

ProdCatMPickerComponent.propTypes = {
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
ProdCatMPickerComponent.propTypes = {};
ProdCatMPickerComponent.displayName = "ProdCatMPickerComponent";
export default ProdCatMPickerComponent;
