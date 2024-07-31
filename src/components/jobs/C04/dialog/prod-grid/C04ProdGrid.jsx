import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { dateFnsDateColumn } from "@/shared-components/dsg/columns/date/dateFnsDateColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import FreeProdTypePickerComponent from "../../../../dsg/columns/FreeProdTypePickerComponent";
import C04ProdGridAddRows from "./C04ProdGridAddRows";

const ContextMenu = createDSGContextMenuComponent({
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
		spriceDisabled,
		getSPriceClassName,
		createRow,
	} = props;
	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SOrdFlag_N",
					createTextColumn({
						continuousUpdates: false,
					})
				),
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
						triggerDelay: 300,
						dense: true,
						// optionLabelSize: "md",
					})
				),
				id: "SProdID",
				title: "商品",
				grow: 4,
				disabled: readOnly || prodDisabled,
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
				...keyColumn(
					"SInqFlag",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				minWidth: 38,
				maxWidth: 38,
				title: "詢",
				disabled: true,
				cellClassName: "star",
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "進貨單價",
				minWidth: 100,
				grow: 1,
				disabled: readOnly || spriceDisabled,
				cellClassName: getSPriceClassName,
			},
			{
				...keyColumn(
					"stype",
					optionPickerColumn(FreeProdTypePickerComponent, {
						name: "stype",
						disableClearable: true,
					})
				),
				title: "贈品",
				minWidth: 80,
				maxWidth: 80,
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
				...keyColumn("SExpDate", dateFnsDateColumn),
				title: "有效日期",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"ordId",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "採購單號",
				grow: 3,
				disabled: true,
			},
		],
		[getSPriceClassName, prodDisabled, readOnly, spriceDisabled]
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
	spriceDisabled: PropTypes.func,
	prodDisabled: PropTypes.func,
	handleGridChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
};

C04ProdGrid.displayName = "C04ProdGrid";
export default C04ProdGrid;
