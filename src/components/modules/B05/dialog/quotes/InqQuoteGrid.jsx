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

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker-column/prodPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const InqQuoteGrid = memo((props) => {
	const {
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		bearer,
		...rest
	} = props;
	const columns = useMemo(
		() => [
			{
				...prodPickerColumn({
					name: "prod",
					withPurchasePackageName: true,
					triggerDelay: 100,
				}),
				id: "SProdID",
				title: "商品",
				grow: 4,
				disabled: readOnly,
			},
			// *******
			// {
			// 	...keyColumn(
			// 		"SProdID",
			// 		createTextColumn({
			// 			continuousUpdates: false,
			// 		})
			// 	),
			// 	title: "商品編號",
			// 	disabled: true,
			// },
			// {
			// 	...keyColumn("SProdData_N", textColumn),
			// 	title: "品名",
			// 	disabled: true,
			// },

			{
				...keyColumn("SPackData_N", textColumn),
				title: "包裝說明",
				disabled: true,
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "廠商報價",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SPrice: "",
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

InqQuoteGrid.propTypes = {
	getRowKey: PropTypes.func,
};

InqQuoteGrid.displayName = "InqQuoteGrid";
export default InqQuoteGrid;