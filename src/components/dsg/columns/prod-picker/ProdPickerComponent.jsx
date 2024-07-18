import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { memo, useCallback, useLayoutEffect, useRef } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.ProdID,active,disabled,focus",
		debug: true,
	});
};

const ProdPickerComponent = memo((props) => {
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
		<ProdPickerContainer
			label=""
			queryParam="qs"
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder="商品"
			typeToSearchText="輸入編號或名稱搜尋"
			filterByServer
			queryRequired
			// DSG 專屬屬性
			hideBorders
			dense
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!focus}
			hideControls={hideControls}
			hidePlaceholder={!active}
			disableFadeOut
			// selectOnFocus
			{...rest}
		/>
	);
}, arePropsEqual);

ProdPickerComponent.propTypes = {
	// name: PropTypes.string,
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
