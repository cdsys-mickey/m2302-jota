import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	keyColumn,
	textColumn,
	createTextColumn,
} from "react-datasheet-grid";

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { supplierPickerColumn } from "../../../../dsg/columns/supplier-picker/supplierPickerColumn";
import { supplierIdPickerColumn } from "../../../../dsg/columns/supplier-picker/supplierIdPickerColumn";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C01ProdGrid = memo((props) => {
	const {
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		prodDisabled,
		rqtQtyDisabled,
		orderQtyDisabled,
		supplierDisabled,
		supplierNameDisabled,
		...rest
	} = props;
	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					prodPickerColumn({
						name: "prod",
						withStock: true,
						triggerDelay: 100,
					})
				),
				id: "SProdID",
				title: "商品",
				grow: 4,
				disabled: readOnly || prodDisabled,
			},

			{
				...keyColumn("PackData_N", textColumn),
				minWidth: 60,
				title: "包裝",
				disabled: true,
			},
			{
				...keyColumn("StockQty_N", createFloatColumn(2)),
				title: "當下庫存",
				minWidth: 100,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("SRqtQty", createFloatColumn(2)),
				title: "請購量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || rqtQtyDisabled,
			},
			{
				...keyColumn("SOrdQty", createFloatColumn(2)),
				title: "採購量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || orderQtyDisabled,
			},
			{
				...keyColumn(
					"supplier",
					supplierIdPickerColumn({
						name: "supplier",
						triggerDelay: 100,
					})
				),
				title: "供應商",
				grow: 3,
				disabled: readOnly || supplierDisabled,
			},
			{
				...keyColumn("SFactNa", textColumn),
				title: "名稱",
				grow: 3,
				disabled: readOnly || supplierNameDisabled,
			},
			{
				...keyColumn("SOrdID", textColumn),
				title: "採購單",
				minWidth: 120,
				disabled: true,
			},
		],
		[
			orderQtyDisabled,
			prodDisabled,
			readOnly,
			rqtQtyDisabled,
			supplierDisabled,
			supplierNameDisabled,
		]
	);

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SOrdQty: null,
			SFactID: "",
			SFactNa: "",
			SOrdID: "*",
		}),
		[]
	);
	const duplicateRow = useCallback(
		({ rowData }) => ({ ...rowData, Pkey: nanoid() }),

		[]
	);

	return (
		<DynamicDataSheetGrid
			ref={gridRef}
			rowKey={getRowKey}
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={createRow}
			duplicateRow={duplicateRow}
			rowClassName={getRowClassName}
		/>
	);
});

C01ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	orderQtyDisabled: PropTypes.func,
};

C01ProdGrid.displayName = "C01ProdGrid";
export default C01ProdGrid;