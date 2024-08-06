import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";

import FreeProdTypePickerComponent from "@/components/dsg/columns/FreeProdTypePickerComponent";
import OutboundTypePickerComponent from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponent";
import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { tooltipColumn } from "@/shared-components/dsg/columns/tooltip/tooltipColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import C08ProdGridAddRows from "./C08ProdGridAddRows";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C08ProdGrid = memo((props) => {
	const {
		createRow,
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		handleSelectionChange,
		getRowClassName,
		height = 300,
		sprodDisabled,
		sqtyDisabled,
		stypeDisabled,
		dtypeDisabled,
		overrideSQtyDisabled,
		getSPriceClassName,
		getSQtyClassName,
		getTooltip,
	} = props;
	const columns = useMemo(
		() => [
			{
				...keyColumn("SOrdFlag_N", textColumn),
				minWidth: 38,
				maxWidth: 38,
				title: "訂",
				disabled: true,
				cellClassName: "star",
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
						// hideControlsOnActive: true,
					})
				),
				id: "SProdID",
				title: "商品",
				grow: 4,
				disabled: readOnly || sprodDisabled,
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
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "調撥單價",
				minWidth: 100,
				grow: 1,
				disabled: true,
				cellClassName: getSPriceClassName,
			},
			{
				...keyColumn("StockQty_N", createFloatColumn(2)),
				title: "庫存",
				minWidth: 90,
				disabled: true,
			},
			{
				...keyColumn(
					"overrideSQty",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "註",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || overrideSQtyDisabled,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "調撥數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || sqtyDisabled,
				cellClassName: getSQtyClassName,
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
					optionPickerColumn(FreeProdTypePickerComponent, {
						name: "stype",
						disableClearable: true,
						// hideControlsOnActive: true,
					})
				),
				title: "贈品",
				minWidth: 80,
				maxWidth: 80,
				disabled: readOnly || stypeDisabled,
			},
			{
				...keyColumn(
					"dtype",
					optionPickerColumn(OutboundTypePickerComponent, {
						name: "dtype",
						// optionLabelSize: "md",
					})
				),
				title: "原因",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly || dtypeDisabled,
			},

			// {
			// 	...keyColumn("SMsg", textColumn),
			// 	title: "訊息",
			// 	minWidth: 140,
			// 	disabled: true,
			// },
		],
		[
			readOnly,
			sprodDisabled,
			getSPriceClassName,
			overrideSQtyDisabled,
			sqtyDisabled,
			getSQtyClassName,
			stypeDisabled,
			dtypeDisabled,
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
			lockRows={readOnly}
			// height={height + (readOnly ? 48 : 0)}
			height={height}
			// rowHeight={42}
			value={data}
			onChange={handleGridChange}
			onSelectionChange={handleSelectionChange}
			columns={columns}
			addRowsComponent={C08ProdGridAddRows}
			disableExpandSelection
			// disableContextMenu
			contextMenuComponent={ContextMenu}
			createRow={createRow}
			duplicateRow={duplicateRow}
			rowClassName={getRowClassName}
			deleteRow={deleteRow}
			stickyRightColumn={tooltipColumn({
				arrow: true,
				getLabel: getTooltip,
				placement: "left",
			})}
		/>
	);
});

C08ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	spriceDisabled: PropTypes.func,
	sprodDisabled: PropTypes.func,
	sqtyDisabled: PropTypes.func,
	stypeDisabled: PropTypes.func,
	dtypeDisabled: PropTypes.func,
	overrideSQtyDisabled: PropTypes.func,
	handleGridChange: PropTypes.func,
	handleSelectionChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	getSQtyClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	getTooltip: PropTypes.func,
	data: PropTypes.array.isRequired,
};

C08ProdGrid.displayName = "C08ProdGrid";
export default C08ProdGrid;
