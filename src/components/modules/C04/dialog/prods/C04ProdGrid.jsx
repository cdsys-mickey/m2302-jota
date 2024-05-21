import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { dateFNSDateColumn } from "@/shared-components/dsg/columns/date/dateFNSDateColumn";
import C04ProdGridAddRows from "./C04ProdGridAddRows";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C04ProdGrid = memo((props) => {
	const {
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		prodDisabled,
	} = props;
	const columns = useMemo(
		() => [
			{
				...keyColumn("SOrdFlag_N", textColumn),
				minWidth: 38,
				maxWidth: 38,
				title: "採",
				disabled: true,
			},
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
				...keyColumn("SInqFlag", textColumn),
				minWidth: 38,
				maxWidth: 38,
				title: "詢",
				disabled: true,
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "進貨單價",
				minWidth: 100,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "進貨數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "進貨金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("SExpDate", dateFNSDateColumn),
				title: "有效日期",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn("ordId", textColumn),
				title: "採購單號",
				grow: 3,
				disabled: true,
			},
		],
		[prodDisabled, readOnly]
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

	const deleteRow = useCallback(({ rowData }) => {
		console.log("deleteRow", rowData);
	}, []);

	return (
		<DynamicDataSheetGrid
			ref={gridRef}
			rowKey={getRowKey}
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			// rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={C04ProdGridAddRows}
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

C04ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
};

C04ProdGrid.displayName = "C04ProdGrid";
export default C04ProdGrid;
