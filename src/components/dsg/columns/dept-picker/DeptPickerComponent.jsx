import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import DeptPickerContainer from "../../../DeptPickerContainer";
import { useMemo } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.SDeptID,active,disabled,focus",
		debug: true,
	});
};

const DeptPickerComponent = memo((props) => {
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

	const { disableActiveControl, ...rest } = columnData;

	// console.log(
	// 	`rendering DeptPickerComponent active: ${active}, focus: ${focus}, rowData:`,
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
		return disabled || disableActiveControl ? !focus : !active;
	}, [active, disableActiveControl, disabled, focus]);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<DeptPickerContainer
			queryParam="qs"
			label=""
			hideBorders
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder="門市"
			typeToSearchText="請輸入門市編號或名稱進行搜尋"
			// filterByServer
			// DSG 專屬屬性
			dense
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!active}
			hideControls={hideControls}
			hidePlaceholder={!active}
			fadeOutDisabled={false}
			// queryRequired
			// virtualize
			{...rest}
		/>
	);
}, arePropsEqual);

DeptPickerComponent.propTypes = {
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
DeptPickerComponent.propTypes = {};
DeptPickerComponent.displayName = "DeptPickerComponent";
export default DeptPickerComponent;
