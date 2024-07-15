import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import { prodPickerColumn } from "../../../../dsg/columns/prod-picker/prodPickerColumn";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const ProdMaterialsGrid = memo((props) => {
	const {
		readOnly = false,
		rowKey,
		gridRef,
		data,
		handleGridChange,
		createRow,
		loading,
		height = 600,
		bearer,
		...rest
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"sprod",
					prodPickerColumn({
						name: "sprod",
						withBomPackageName: true,
					})
				),
				title: "商品",
				grow: 8,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"SPackData_N",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "包裝說明",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("SProdQty", createFloatColumn(2)),
				title: "標準用量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	if (!data) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (data?.length === 0 && readOnly) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DynamicDataSheetGrid
			ref={gridRef}
			// rowKey="id"
			rowKey={rowKey}
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			// rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={createRow}
		/>
	);
});

ProdMaterialsGrid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	data: PropTypes.array,
	createRow: PropTypes.func,
};

ProdMaterialsGrid.displayName = "ProdMaterialsGrid";
export default ProdMaterialsGrid;
