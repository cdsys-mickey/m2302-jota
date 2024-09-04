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
import C09ProdGridAddRows from "./C09ProdGridAddRows";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import OutboundTypePickerComponent from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponent";
import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C09ProdGrid = memo((props) => {
	const {
		createRow,
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		stypeDisabled,
		sprodDisabled,
		getSPriceClassName,
		dtypeDisabled,
		sqtyDisabled,
	} = props;
	const columns = useMemo(
		() => [
			{
				...keyColumn("SoFlag_N", textColumn),
				minWidth: 38,
				maxWidth: 38,
				title: "出",
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
				title: "撥入單價",
				minWidth: 100,
				grow: 1,
				disabled: true,
				cellClassName: getSPriceClassName,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "撥入數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || sqtyDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "撥入金額",
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
		],
		[
			readOnly,
			sprodDisabled,
			getSPriceClassName,
			sqtyDisabled,
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
			columns={columns}
			addRowsComponent={C09ProdGridAddRows}
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

C09ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	handleGridChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	data: PropTypes.array.isRequired,
	stypeDisabled: PropTypes.func,
	sprodDisabled: PropTypes.func,
	dtypeDisabled: PropTypes.func,
	sqtyDisabled: PropTypes.func,
	createRow: PropTypes.func,
};

C09ProdGrid.displayName = "C09ProdGrid";
export default C09ProdGrid;
