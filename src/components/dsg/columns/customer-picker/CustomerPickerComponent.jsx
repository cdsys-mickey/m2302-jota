import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { CustomerPickerContainer } from "@/components/picker/CustomerPickerContainer";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.CustID,active,disabled,focus",
		debug: true,
	});
};

const CustomerPickerComponent = memo((props) => {
	const {
		rowData,
		setRowData,
		// Extra information
		// rowIndex,
		// columnIndex,
		columnData,
		// Cell state
		active,
		focus,
		disabled,
		// Control functions
		stopEditing,
		// rest
		placeholder = "供應商",
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
			setTimeout(() => {
				stopEditing({ nextRow: false });
			}, 50);
			// stopEditing({ nextRow: false });
			// ref.current?.blur();
		},
		[setRowData, stopEditing]
	);

	// const handleClose = useCallback(() => {
	// 	stopEditing({ nextRow: false });
	// 	console.log("handleClose");
	// 	// ref.current?.blur();
	// }, [stopEditing]);

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
		<CustomerPickerContainer
			queryParam="qs"
			label=""
			hideBorders
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder={placeholder}
			typeToSearchText="請輸入編號或名稱進行搜尋"
			// filterByServer
			// queryRequired
			// virtualize
			// DSG 專屬屬性
			dense
			// disablePointerEvents={!focus}
			// hidePopupIndicator={!active}
			hideControls={hideControls}
			// hidePlaceholder={!active}
			disableFadeOut
			{...rest}
		/>
	);
}, arePropsEqual);

CustomerPickerComponent.propTypes = {
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

	placeholder: PropTypes.string,
};
CustomerPickerComponent.propTypes = {};
CustomerPickerComponent.displayName = "CustomerPickerComponent";
export default CustomerPickerComponent;
