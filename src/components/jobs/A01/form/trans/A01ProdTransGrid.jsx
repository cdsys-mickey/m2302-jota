import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DynamicDataSheetGrid, keyColumn } from "react-datasheet-grid";
import Depts from "@/modules/md-depts";
import { createWebApiOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { deptPickerColumn } from "../../../../dsg/columns/dept-picker/deptPickerColumn";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A01ProdTransGrid = memo((props) => {
	const {
		readOnly = false,
		gridRef,
		data,
		columns,
		onActiveCellChange,
		handleGridChange,
		height = 600,
		createRow,
		...rest
	} = props;

	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			...keyColumn(
	// 				"dept",
	// 				deptPickerColumn({
	// 					name: "dept",
	// 				})
	// 			),
	// 			title: "門市",
	// 			grow: 6,
	// 			disabled: readOnly,
	// 		},
	// 		{
	// 			...keyColumn("SCost", createFloatColumn(2)),
	// 			title: "調撥成本",
	// 			minWidth: 90,
	// 			grow: 1,
	// 			disabled: readOnly,
	// 		},
	// 	],
	// 	[readOnly]
	// );

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
			rowKey="id"
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			rowHeight={34}
			value={data}
			onChange={handleGridChange}
			onActiveCellChange={onActiveCellChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={createRow}
		/>
	);
});

A01ProdTransGrid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	data: PropTypes.array,
};

A01ProdTransGrid.displayName = "ProdTransGrid";
export default A01ProdTransGrid;
