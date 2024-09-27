import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A01ProdComboGrid = memo((props) => {
	const {
		lockRows = false,
		gridRef,
		data,
		handleGridChange,
		onActiveCellChange,
		columns,
		height = 600,
		createRow,
		...rest
	} = props;

	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			...keyColumn(
	// 				"prod",
	// 				prodPickerColumn({
	// 					name: "prod",
	// 					triggerDelay: 300,
	// 					placeholder: "組合商品",
	// 					typeToSearchText: "請輸入商品編號或名稱進行搜尋",
	// 				})
	// 			),
	// 			title: "商品",
	// 			grow: 8,
	// 			disabled: lockRows,
	// 		},
	// 		{
	// 			...keyColumn("SProdQty", createFloatColumn(2)),
	// 			title: "數量",
	// 			minWidth: 90,
	// 			grow: 1,
	// 			disabled: lockRows,
	// 		},
	// 	],
	// 	[lockRows]
	// );

	if (!data) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (data?.length === 0 && lockRows) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DSGGrid
			ref={gridRef}
			rowKey="id"
			lockRows={lockRows}
			height={height + (lockRows ? 48 : 0)}
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

A01ProdComboGrid.propTypes = {
	lockRows: PropTypes.bool,
	gridRef: PropTypes.func,
	handleGridChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	data: PropTypes.array,
	columns: PropTypes.array,
};

A01ProdComboGrid.displayName = "ProdComboGrid";
export default A01ProdComboGrid;
