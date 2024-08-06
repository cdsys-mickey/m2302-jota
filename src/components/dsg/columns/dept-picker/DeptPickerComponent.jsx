import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import DeptPickerContainer from "../../../DeptPickerContainer";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.DeptID,active,disabled,focus",
		debug: true,
	});
};

const DeptPickerComponent = memo((props) => {
	const {
		// Data
		rowData,
		setRowData,
		// Extra information
		rowIndex,
		columnIndex,
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

	const { hideControlsOnActive, selectOnFocus, ...rest } = columnData;

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

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
			if (selectOnFocus) {
				ref.current?.select();
			}
		} else {
			ref.current?.blur();
		}
	}, [focus, selectOnFocus]);

	return (
		<DeptPickerContainer
			queryParam="qs"
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder="門市"
			typeToSearchText="請輸入門市編號或名稱進行搜尋"
			// filterByServer
			// DSG 專屬屬性
			cell={cell}
			dense
			hideControls={hideControls}
			hidePlaceholder={!active}
			hideBorders
			disableFadeOut
			toastError
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
