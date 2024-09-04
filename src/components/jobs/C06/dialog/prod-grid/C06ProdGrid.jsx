import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";

import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import C06ProdGridAddRows from "./C06ProdGridAddRows";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C06ProdGrid = memo((props) => {
	const {
		createRow,
		disableAddRows,
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		sprodDisabled,
		sqtyDisabled,
		stypeDisabled,
		creating,
		getSPriceClassName,
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
				grow: 4,
				disabled: readOnly || sprodDisabled,
			},

			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "單價",
				minWidth: 100,
				grow: 1,
				disabled: true,
				cellClassName: getSPriceClassName,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "訂貨量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || sqtyDisabled,
			},
			{
				...keyColumn("PackData_N", textColumn),
				minWidth: 60,
				title: "包裝",
				disabled: true,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn(
					"stype",
					optionPickerColumn(FreeProdTypePickerComponentContainer, {
						name: "stype",
						disableClearable: true,
					})
				),
				title: "贈品",
				minWidth: 80,
				maxWidth: 80,
				disabled: readOnly || stypeDisabled,
			},
			{
				...keyColumn(
					"SRemark",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "備註",
				grow: 4,
				disabled: readOnly,
			},
			{
				...keyColumn("SNotQty", createFloatColumn(2)),
				title: "未到量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || creating,
			},
			{
				...keyColumn("SMsg", textColumn),
				title: "訊息",
				minWidth: 140,
				disabled: true,
			},
		],
		[
			creating,
			getSPriceClassName,
			sprodDisabled,
			readOnly,
			sqtyDisabled,
			stypeDisabled,
		]
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
			lockRows={readOnly || disableAddRows}
			height={height + (readOnly ? 48 : 0)}
			// rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={C06ProdGridAddRows}
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

C06ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	spriceDisabled: PropTypes.func,
	sprodDisabled: PropTypes.func,
	handleGridChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	disableAddRows: PropTypes.bool,
	creating: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	data: PropTypes.array.isRequired,
	sqtyDisabled: PropTypes.func,
	stypeDisabled: PropTypes.func,
};

C06ProdGrid.displayName = "C06ProdGrid";
export default C06ProdGrid;
