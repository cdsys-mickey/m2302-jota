import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DynamicDataSheetGrid, keyColumn } from "react-datasheet-grid";
import Prods from "../../../../modules/md-prods";
import { createWebApiOptionPickerColumn } from "../../../../shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import DSGAddRowsToolbar from "../../DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const ProdComboGrid = memo((props) => {
	const {
		lockRows,
		gridRef,
		data,
		handleGridChange,
		loading,
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
						ComponentProps: {
							url: "v1/prods",
							parameters: "tp=20",
							bearer: bearer,
							queryParam: "qs",
							getOptionLabel: Prods.getOptionLabel,
							isOptionEqualToValue: Prods.isOptionEqualToValue,
							filterByServer: true,
							size: "small",
							getData: (p) => p["data"],
						},
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
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
		/>
	);
});

ProdComboGrid.propTypes = {
	lockRows: PropTypes.bool,
	gridRef: PropTypes.func,
	data: PropTypes.array,
};

ProdComboGrid.displayName = "ProdComboGrid";
export default ProdComboGrid;
