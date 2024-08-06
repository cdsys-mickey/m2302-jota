import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import D05ProdGridAddRows from "./D05ProdGridAddRows";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import OutboundTypePickerComponent from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponent";
import { deptPickerColumn } from "@/components/dsg/columns/dept-picker/deptPickerColumn";
import { customerPickerColumn } from "@/components/dsg/columns/customer-picker/customerPickerColumn";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const D05ProdGrid = memo((props) => {
	const {
		createRow,
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		customerDisabled,
		deptDisabled,
		sqtyDisabled,
		dtypeDisabled,
	} = props;
	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					prodPickerColumn({
						name: "prod",
						withStock: true,
						triggerDelay: 300,
						dense: true,
						// optionLabelSize: "md",
					})
				),
				id: "SProdID",
				title: "商品",
				grow: 5,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				minWidth: 60,
				title: "包裝",
				disabled: true,
			},
			{
				...keyColumn("StockQty_N", createFloatColumn(2)),
				title: "庫存",
				minWidth: 90,
				disabled: true,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || sqtyDisabled,
			},
			{
				...keyColumn(
					"dtype",
					optionPickerColumn(OutboundTypePickerComponent, {
						name: "dtype",
						// disableClearable: true,
						// optionLabelSize: "md",
						// hideControlsOnActive: true,
					})
				),
				title: "原因",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly || dtypeDisabled,
			},
			{
				...keyColumn(
					"customer",
					customerPickerColumn({
						name: "customer",
						// optionLabelSize: "md",
					})
				),
				title: "客戶代碼",
				grow: 4,
				disabled: readOnly || customerDisabled,
			},
			{
				...keyColumn(
					"dept",
					deptPickerColumn({
						name: "dept",
					})
				),
				title: "門市碼",
				grow: 4,
				disabled: readOnly || deptDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
		],
		[customerDisabled, deptDisabled, dtypeDisabled, readOnly, sqtyDisabled]
	);

	const duplicateRow = useCallback(
		({ rowData }) => ({ ...rowData, Pkey: nanoid() }),

		[]
	);

	const deleteRow = useCallback(({ rowData }) => {
		console.log("deleteRow", rowData);
	}, []);

	return (
		<DynamicDataSheetGrid
			ref={gridRef}
			rowKey={getRowKey}
			lockRows={readOnly}
			// height={height + (readOnly ? 48 : 0)}
			height={height}
			// rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={D05ProdGridAddRows}
			disableExpandSelection
			// disableContextMenu
			contextMenuComponent={ContextMenu}
			createRow={createRow}
			duplicateRow={duplicateRow}
			rowClassName={getRowClassName}
			deleteRow={deleteRow}
		/>
	);
});

D05ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	handleGridChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	data: PropTypes.array.isRequired,
	sprodDisabled: PropTypes.func,
	dtypeDisabled: PropTypes.func,
	sqtyDisabled: PropTypes.func,
	deptDisabled: PropTypes.func,
	customerDisabled: PropTypes.func,
};

D05ProdGrid.displayName = "D05ProdGrid";
export default D05ProdGrid;
