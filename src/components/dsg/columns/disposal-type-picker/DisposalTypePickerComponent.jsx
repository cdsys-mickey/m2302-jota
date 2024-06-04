import Objects from "@/shared-modules/sd-objects";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import { OutboundTypePicker } from "../../../picker/OutboundTypePicker";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		fields: "rowData.CodeID,active,disabled,focus",
		debug: true,
	});
};

const DisposalTypePickerComponent = memo((props) => {
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
	// 	`rendering DisposalTypePickerComponent active: ${active}, focus: ${focus}, rowData:`,
	// 	rowData
	// );

	const ref = useRef();

	const handleChange = useCallback(
		(newValue) => {
			console.log("handleChange", newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			setTimeout(() => stopEditing({ nextRow: false }), 100);
		},
		[setRowData, stopEditing]
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
		<OutboundTypePicker
			name={name}
			label=""
			inputRef={ref}
			disabled={disabled}
			value={rowData}
			onChange={handleChange}
			// onClose={handleClose}
			placeholder="銷退/報廢原因"
			// typeToSearchText="請輸入編號或名稱進行搜尋"
			// filterByServer
			// DSG 專屬屬性
			dense
			hideBorders
			disablePointerEvents={!focus}
			hidePopupIndicator={!focus}
			hidePlaceholder={!active}
			fadeOutDisabled={false}
			disableClearable
			// virtualize
			{...rest}
		/>
	);
}, arePropsEqual);

DisposalTypePickerComponent.propTypes = {
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
DisposalTypePickerComponent.propTypes = {};
DisposalTypePickerComponent.displayName = "DisposalTypePickerComponent";
export default DisposalTypePickerComponent;
