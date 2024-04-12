import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DynamicDataSheetGrid, keyColumn } from "react-datasheet-grid";
import Prods from "@/modules/md-prods";
import { createWebApiOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const ProdComboGrid = memo((props) => {
	const {
		lockRows = false,
		gridRef,
		data,
		handleGridChange,
		height = 600,
		bearer,
		...rest
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					createWebApiOptionPickerColumn({
						url: "v1/prods",
						querystring: "tp=50",
						bearer: bearer,
						queryParam: "qs",
						getOptionLabel: Prods.getOptionLabel,
						isOptionEqualToValue: Prods.isOptionEqualToValue,
						filterByServer: true,
						size: "small",
						getData: (p) => p["data"],
						// queryRequired: true,
						placeholder: "組合商品",
						typeToSearchText: "請輸入商品編號或名稱進行搜尋",
					})
				),
				title: "商品",
				grow: 8,
				disabled: lockRows,
			},
			{
				...keyColumn("SProdQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: lockRows,
			},
		],
		[bearer, lockRows]
	);

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
		<DynamicDataSheetGrid
			ref={gridRef}
			rowKey="id"
			lockRows={lockRows}
			height={height + (lockRows ? 48 : 0)}
			rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={() => ({
				prod: null,
				SProdQty: "",
			})}
		/>
	);
});

ProdComboGrid.propTypes = {
	lockRows: PropTypes.bool,
	gridRef: PropTypes.func,
	handleGridChange: PropTypes.func,
	data: PropTypes.array,
};

ProdComboGrid.displayName = "ProdComboGrid";
export default ProdComboGrid;
