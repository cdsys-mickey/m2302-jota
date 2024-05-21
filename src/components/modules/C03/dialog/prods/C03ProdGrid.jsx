import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
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
import C03ProdGridAddRows from "./C03ProdGridAddRows";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C03ProdGrid = memo((props) => {
	const {
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		prodDisabled,
		spriceDisabled,
		sqtyDisabled,
		sNotQtyDisabled,
		rqtQtyDisabled,
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
						triggerDelay: 300,
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
				title: "單價",
				minWidth: 100,
				grow: 1,
				disabled: readOnly || spriceDisabled,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || sqtyDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("SNotQty", createFloatColumn(2)),
				title: "未進量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || sNotQtyDisabled,
			},
		],
		[prodDisabled, readOnly, sNotQtyDisabled, spriceDisabled, sqtyDisabled]
	);

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SOrdQty: null,
			SQty: "",
			SPrice: "",
			SAmt: "",
			SInqFlag: "",
			SFactID: "",
			SFactNa: "",
			SOrdID: "*",
			SInQty: "",
			SNotQty: "",
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
			// // rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={C03ProdGridAddRows}
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

C03ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	spriceDisabled: PropTypes.func,
	sqtyDisabled: PropTypes.func,
	sNotQtyDisabled: PropTypes.func,
};

C03ProdGrid.displayName = "C03ProdGrid";
export default C03ProdGrid;
