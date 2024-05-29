import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import C07ProdGridAddRows from "./C07ProdGridAddRows";
import { optionPickerColumn } from "../../../../../shared-components/dsg/columns/option-picker/optionPickerColumn";
import FreeProdTypePickerComponent from "../../../../dsg/columns/FreeProdTypePickerComponent";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C07ProdGrid = memo((props) => {
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
						optionLabelSize: "small",
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
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "單價",
				minWidth: 100,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "訂貨量",
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
					"SRemark",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "備註",
				grow: 3,
				disabled: readOnly,
			},
			{
				...keyColumn("SNotQty", createFloatColumn(2)),
				title: "未到量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || creating,
			},
		],
		[prodDisabled, readOnly]
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
			addRowsComponent={C07ProdGridAddRows}
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

C07ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	spriceDisabled: PropTypes.func,
	prodDisabled: PropTypes.func,
	handleGridChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	data: PropTypes.array.isRequired,
};

C07ProdGrid.displayName = "C07ProdGrid";
export default C07ProdGrid;
