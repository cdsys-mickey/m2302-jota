import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import Prods from "@/modules/md-prods";
import { createWebApiOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import DSGAddRowsToolbar from "@/components/modules/DSGAddRowsToolbar";
import { createOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createOptionPickerColumn";
import ProdPickerColumn from "@/components/dsg/columns/ProdPickerColumn";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const ProdMaterialsGrid = memo((props) => {
	const {
		readOnly = false,
		gridRef,
		data,
		handleGridChange,
		handleCreateRow,
		loading,
		height = 600,
		bearer,
		...rest
	} = props;

	const columns = useMemo(
		() => [
			{
				// ...keyColumn(
				// 	"prod",
				// 	createWebApiOptionPickerColumn({
				// 		url: "v1/prods",
				// 		queryString: "tp=20&pb=1",
				// 		bearer: bearer,
				// 		queryParam: "qs",
				// 		getOptionLabel: Prods.getOptionLabel,
				// 		isOptionEqualToValue: Prods.isOptionEqualToValue,
				// 		filterByServer: true,
				// 		size: "small",
				// 		getData: (p) => p["data"],
				// 	})
				// ),
				...createOptionPickerColumn((props) => (
					<ProdPickerColumn
						name="prod"
						withBomPackageName
						{...props}
					/>
				)),
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
			rowKey="id"
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={handleCreateRow}
		/>
	);
});

ProdMaterialsGrid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	data: PropTypes.array,
	handleCreateRow: PropTypes.func,
};

ProdMaterialsGrid.displayName = "ProdMaterialsGrid";
export default ProdMaterialsGrid;
