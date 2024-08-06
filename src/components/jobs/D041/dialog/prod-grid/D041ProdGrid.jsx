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
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import D041ProdGridAddRows from "./D041ProdGridAddRows";
import { createCheckboxColumn2 } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn2";
import OutboundTypePickerComponent from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponent";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import FreeProdTypePickerComponent from "../../../../dsg/columns/FreeProdTypePickerComponent";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const D041ProdGrid = memo((props) => {
	const {
		createRow,
		getRowKey,
		readOnly,
		gridRef,
		data,
		handleGridChange,
		getRowClassName,
		height = 300,
		dtypeDisabled,
		stypeDisabled,
		reworkedDisabled,
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
				grow: 5,
				disabled: readOnly,
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
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SExpDate", dateFnsDateColumn),
				title: "有效日期",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly,
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
				title: "不良",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly || dtypeDisabled,
			},
			{
				...keyColumn(
					"reworked",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "重",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || reworkedDisabled,
			},
			{
				...keyColumn(
					"stype",
					optionPickerColumn(FreeProdTypePickerComponent, {
						name: "stype",
						disableClearable: true,
					})
				),
				title: "試",
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
		],
		[dtypeDisabled, readOnly, reworkedDisabled, stypeDisabled]
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
			addRowsComponent={D041ProdGridAddRows}
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

D041ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	spriceDisabled: PropTypes.func,
	prodDisabled: PropTypes.func,
	handleGridChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	data: PropTypes.array.isRequired,
	gridRef: PropTypes.func,
	dtypeDisabled: PropTypes.func,
	stypeDisabled: PropTypes.func,
	reworkedDisabled: PropTypes.func,
};

D041ProdGrid.displayName = "D041ProdGrid";
export default D041ProdGrid;
