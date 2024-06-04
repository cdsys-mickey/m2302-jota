import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
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
import C08ProdGridAddRows from "./C08ProdGridAddRows";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import FreeProdTypePickerComponent from "../../../../dsg/columns/FreeProdTypePickerComponent";
import DisposalTypePickerComponent from "../../../../dsg/columns/disposal-type-picker/DisposalTypePickerComponent";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C08ProdGrid = memo((props) => {
	const {
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		sprodDisabled,
		stypeDisabled,
		getSPriceClassName,
	} = props;
	const columns = useMemo(
		() => [
			{
				...keyColumn("SOrdFlag_N", textColumn),
				minWidth: 38,
				maxWidth: 38,
				title: "訂",
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
						optionLabelSize: "small",
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
			},
			{
				...keyColumn("SQtyNote", textColumn),
				minWidth: 38,
				maxWidth: 38,
				title: "強",
				disabled: true,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "調撥數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
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
				disabled: readOnly || stypeDisabled,
			},
			{
				...keyColumn(
					"dtype",
					optionPickerColumn(DisposalTypePickerComponent, {
						name: "dtype",
						// disableClearable: true,
						optionLabelSize: "small",
					})
				),
				title: "原因",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly,
			},
			{
				...keyColumn("SMsg", textColumn),
				title: "訊息",
				minWidth: 140,
				disabled: true,
			},
		],
		[getSPriceClassName, sprodDisabled, readOnly, stypeDisabled]
	);

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SQty: "",
			SPrice: "",
			SRemark: "",
			ChkQty: "",
			SOrdID: "",
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
			addRowsComponent={C08ProdGridAddRows}
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

C08ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	spriceDisabled: PropTypes.func,
	sprodDisabled: PropTypes.func,
	handleGridChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	data: PropTypes.array.isRequired,
	stypeDisabled: PropTypes.func,
};

C08ProdGrid.displayName = "C08ProdGrid";
export default C08ProdGrid;
