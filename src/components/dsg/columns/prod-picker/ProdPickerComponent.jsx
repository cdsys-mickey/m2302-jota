import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import ProdPicker from "@/components/picker/ProdPicker";
import { useOptionPickerComponent } from "../../../../shared-hooks/dsg/useOptionPickerComponent";

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

	const rowDataRef = useRef(rowData);
	rowDataRef.current = rowData;

	const { hideControlsOnActive, selectOnFocus, ...rest } = columnData;

	const { ref, hideControls, cell } = useOptionPickerComponent({
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		rowIndex,
		columnIndex,
	});

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

	return (
		<ProdPicker
			label=""
			queryParam="qs"
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder="商品"
			typeToSearchText="輸入編號、條碼或名稱搜尋..."
			filterByServer
			queryRequired
			// DSG 專屬
			cell={cell}
			dense
			hideControls={hideControls}
			// hidePlaceholder={!active}
			hideBorders
			disableFadeOut
			toastError
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
	nextCell: PropTypes.func,
};
ProdPickerComponent.propTypes = {};
ProdPickerComponent.displayName = "ProdPickerComponent";
export default ProdPickerComponent;
